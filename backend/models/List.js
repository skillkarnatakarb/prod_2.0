const mongoose = require('mongoose');

// Define the List schema
const ListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'List name is required'],
      trim: true, // Removes leading and trailing whitespace
      unique: true, // Ensures no duplicate names
      maxlength: [100, 'List name cannot exceed 100 characters'], // Restricts the name length
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // Refers to the Student model
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true, // Prevents modification of creation date
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Disables the __v field for versioning
  }
);

// Middleware to check for duplicate names before saving
ListSchema.pre('save', async function (next) {
  const existingList = await mongoose.models.List.findOne({ name: this.name });
  if (existingList) {
    throw new Error('List name must be unique');
  }
  next();
});

// Middleware for logging before removing a list
ListSchema.pre('remove', async function (next) {
  console.log(`List with name "${this.name}" is being removed`);
  next();
});

// Add a unique index for the `name` field to optimize search queries
ListSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('List', ListSchema);
