const fs = require('fs');
const path = require('path');
const List = require('../models/List');
const Student = require('../models/Student');


// Parse CSV file
const parseCsv = (csvFilePath) => {
  return new Promise((resolve, reject) => {
    const students = [];
    const csv = require('csv-parser');

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        students.push(row);
      })
      .on('end', () => {
        resolve(students);
      })
      .on('error', (error) => {
        reject(error);
      });
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

    // Validate name
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'List name is required' });
    }

    const file = req.file; // CSV file uploaded via middleware
    if (!file) {
      return res.status(400).json({ message: 'CSV file is required' });
    }

    const csvFilePath = path.join(__dirname, '..', 'uploads', file.filename);

    // Parse CSV file
    const students = await parseCsv(csvFilePath);

    // Save the list in the database
    const newList = new List({ name });
    await newList.save();

    // Save each student from the CSV to the database
    for (const student of students) {
      const newStudent = new Student({
        name: student.Name,
        email: student.Email,
        phoneNumber: student['Phone Number'],
        collegeName: student['College Name'],
        education: student.Education,
        specialization: student.Specialization,
        semester: student.Semester,
        listId: newList._id, // Reference the new list's ID
      });
      await newStudent.save();
    }

    // Remove CSV file after processing
    fs.unlinkSync(csvFilePath);

    res.status(201).json({ message: 'List created successfully', listId: newList._id });
  } catch (error) {
    console.error('Error creating list:', error.message);
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

// Delete List
exports.deleteList = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete all students associated with the list
    await Student.deleteMany({ listId: id });

    // Delete the list itself
    await List.findByIdAndDelete(id);

    res.status(200).json({ message: 'List deleted successfully' });
  } catch (error) {
    console.error('Error deleting list:', error.message);
    res.status(500).json({ message: 'Error deleting list', error: error.message });
  }
};
