const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'], // Validates email format
      unique: true, // Ensures email uniqueness
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'], // Validates phone number format
    },
    collegeName: {
      type: String,
      required: [true, 'College name is required'],
      trim: true,
      maxlength: [150, 'College name cannot exceed 150 characters'],
    },
    education: {
      type: String,
      required: [true, 'Education level is required'],
      trim: true,
      enum: {
        values: ['Bachelors', 'Masters', 'PhD', 'Diploma', 'Other'], // Valid values
        message: 'Education must be one of Bachelors, Masters, PhD, Diploma, or Other',
      },
    },
    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
      trim: true,
      maxlength: [100, 'Specialization cannot exceed 100 characters'],
    },
    semester: {
      type: String,
      required: [true, 'Semester is required'],
      trim: true,
      default: '1', // Default semester
      match: [/^\d+$/, 'Semester must be a valid number'], // Ensures semester is numeric
    },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'List', // References the List schema
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    versionKey: false, // Disables the `__v` field
  }
);

// Pre-save hook for formatting the name and specialization
StudentSchema.pre('save', function (next) {
  // Capitalize the first letter of each word in the name
  this.name = this.name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  // Capitalize the first letter of the specialization
  if (this.specialization) {
    this.specialization =
      this.specialization.charAt(0).toUpperCase() + this.specialization.slice(1).toLowerCase();
  }

  next();
});

// Pre-update middleware for formatting updates
StudentSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();

  if (update.name) {
    update.name = update.name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  if (update.specialization) {
    update.specialization =
      update.specialization.charAt(0).toUpperCase() + update.specialization.slice(1).toLowerCase();
  }

  next();
});

// Indexing for faster queries
StudentSchema.index({ email: 1 }, { unique: true }); // Ensures unique email
StudentSchema.index({ list: 1 }); // Optimizes queries based on the list field

// Middleware for logging removal of students
StudentSchema.pre('remove', function (next) {
  console.log(`Student with email "${this.email}" is being removed.`);
  next();
});

// Custom validation for semester range (e.g., 1-12 for typical semester systems)
StudentSchema.path('semester').validate(function (value) {
  return value >= 1 && value <= 12; // Assuming semesters range from 1 to 12
}, 'Semester must be between 1 and 12');

// Export the model
module.exports = mongoose.model('Student', StudentSchema);
