const fs = require('fs');
const path = require('path');
const List = require('../models/List');
const Student = require('../models/Student');
const csvParser = require('csv-parser');

// Parse CSV file
const parseCsv = (csvFilePath) => {
  return new Promise((resolve, reject) => {
    const students = [];
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (row) => students.push(row))
      .on('end', () => resolve(students))
      .on('error', (error) => reject(error));
  });
};

// Download template
exports.downloadTemplate = (req, res) => {
  try {
    const templatePath = path.join(__dirname, '..', 'templates', 'sample.csv');
    res.download(templatePath, 'Student_Template.csv', (err) => {
      if (err) {
        console.error('Error downloading template:', err.message);
        res.status(500).json({ message: 'Error downloading template' });
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create List with CSV Upload
exports.createList = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate list name
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'List name is required' });
    }

    // Check for duplicate list name
    const existingList = await List.findOne({ name });
    if (existingList) {
      return res.status(400).json({ message: 'List name already exists' });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'CSV file is required' });
    }

    const csvFilePath = path.join(__dirname, '..', 'uploads', file.filename);
    const students = await parseCsv(csvFilePath);

    // Save the new list
    const newList = new List({ name });
    await newList.save();

    // Save students to the database
    const studentRecords = students.map((student) => ({
      name: student.Name || 'Unknown',
      email: student.Email || 'N/A',
      phoneNumber: student['Phone Number'] || 'N/A',
      collegeName: student['College Name'] || 'N/A',
      education: student.Education || 'N/A',
      specialization: student.Specialization || 'N/A',
      semester: student.Semester || '1',
      listId: newList._id, // Reference to the new list's ID
    }));

    await Student.insertMany(studentRecords); // Bulk insert students
    fs.unlinkSync(csvFilePath); // Remove CSV file after processing

    res.status(201).json({ message: 'List and students added successfully', listId: newList._id });
  } catch (error) {
    console.error('Error creating list:', error.message);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate list name not allowed' });
    }
    res.status(500).json({ message: 'Error creating list', error: error.message });
  }
};

// Get Lists with Student Count
exports.getLists = async (req, res) => {
  try {
    const lists = await List.aggregate([
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: 'listId',
          as: 'students',
        },
      },
      {
        $project: {
          name: 1,
          createdAt: 1,
          studentCount: { $size: '$students' }, // Count the number of students
        },
      },
      { $sort: { createdAt: -1 } }, // Sort by creation date (most recent first)
    ]);

    res.status(200).json(lists);
  } catch (error) {
    console.error('Error fetching lists:', error.message);
    res.status(500).json({ message: 'Error fetching lists', error: error.message });
  }
};

// Delete List and Associated Students
exports.deleteList = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'List ID is required' });
    }

    // Check if list exists
    const listExists = await List.findById(id);
    if (!listExists) {
      return res.status(404).json({ message: 'List not found' });
    }

    // Delete associated students
    await Student.deleteMany({ listId: id });

    // Delete the list itself
    await List.findByIdAndDelete(id);

    res.status(200).json({ message: 'List deleted successfully' });
  } catch (error) {
    console.error('Error deleting list:', error.message);
    res.status(500).json({ message: 'Error deleting list', error: error.message });
  }
};





// Get Students by List ID
exports.getStudentsByList = async (req, res) => {
  try {
    const { listId } = req.params;

    if (!listId) {
      return res.status(400).json({ message: 'List ID is required' });
    }

    const students = await Student.find({ listId });
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error.message);
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};
