const List = require('../models/List');
const Student = require('../models/Student');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

// Download CSV template
exports.downloadTemplate = (req, res) => {
  const filePath = path.join(__dirname, '../templates/sample.csv');
  res.download(filePath, 'sample.csv', (err) => {
    if (err) {
      console.error('Error sending file:', err.message);
      res.status(500).json({ message: 'Error downloading file', error: err.message });
    }
  });
};

// Create a new list and parse uploaded CSV
exports.saveList = async (req, res) => {
  const { name } = req.body;
  const csvFile = req.file;

  if (!name || !csvFile) {
    return res.status(400).json({ message: 'List name and CSV file are required' });
  }

  // Check for duplicate list name
  const existingList = await List.findOne({ name });
  if (existingList) {
    return res.status(400).json({ message: 'A list with this name already exists' });
  }

  const newList = new List({ name });
  const students = [];
  const requiredFields = ['Name', 'Email', 'Phone Number', 'College Name', 'Education', 'Specialization', 'Semester'];
  const skippedRows = [];

  fs.createReadStream(csvFile.path)
    .pipe(csv())
    .on('data', (data) => {
      try {
        const student = {
          name: data['Name']?.trim(),
          email: data['Email']?.trim(),
          phoneNumber: data['Phone Number']?.trim(),
          collegeName: data['College Name']?.trim(),
          education: data['Education']?.trim(),
          specialization: data['Specialization']?.trim(),
          semester: data['Semester']?.trim(),
        };

        const missingFields = requiredFields.filter((field) => !data[field]?.trim());
        if (missingFields.length > 0) {
          console.warn(`Skipping row due to missing fields: ${missingFields.join(', ')}`, data);
          skippedRows.push({ row: data, missingFields });
        } else {
          students.push(student);
        }
      } catch (error) {
        console.error('Error processing row:', error.message, data);
      }
    })
    .on('end', async () => {
      fs.unlinkSync(csvFile.path); // Clean up uploaded file

      if (students.length === 0) {
        return res.status(400).json({
          message: 'No valid student data found in the CSV file',
          skippedRows,
        });
      }

      try {
        const studentDocs = await Student.insertMany(students);
        newList.students = studentDocs.map((student) => student._id);

        await newList.save();
        res.status(201).json({ 
          message: 'List created successfully', 
          list: newList, 
          skippedRows 
        });
      } catch (error) {
        console.error('Error saving list or students:', error.message);
        res.status(500).json({ message: 'Failed to save list or students', error });
      }
    })
    .on('error', (error) => {
      console.error('Error parsing CSV file:', error.message);
      res.status(500).json({ message: 'Error parsing CSV file', error });
    });
};

// Fetch all lists with optional pagination and sorting
exports.getLists = async (req, res) => {
  const { page = 1, limit = 10, sort = '-createdAt' } = req.query;

  try {
    const lists = await List.find()
      .populate('students')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));

    const totalLists = await List.countDocuments();
    res.status(200).json({ lists, totalLists, page, limit });
  } catch (error) {
    console.error('Error fetching lists:', error.message);
    res.status(500).json({ message: 'Error fetching lists', error });
  }
};

// Fetch a specific list
exports.getList = async (req, res) => {
  const { id } = req.params;
  try {
    const list = await List.findById(id).populate('students');
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.status(200).json(list);
  } catch (error) {
    console.error('Error fetching list:', error.message);
    res.status(500).json({ message: 'Error fetching list', error });
  }
};

// Add a student to a list
exports.addStudent = async (req, res) => {
  const { name, email, phoneNumber, collegeName, education, specialization, semester, listId } = req.body;

  if (!listId) {
    return res.status(400).json({ message: 'List ID is required' });
  }

  if (!name || !email || !phoneNumber) {
    return res.status(400).json({ message: 'Name, email, and phone number are required' });
  }

  try {
    const student = new Student({
      name,
      email,
      phoneNumber,
      collegeName,
      education,
      specialization,
      semester,
      list: listId,
    });

    await student.save();

    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    list.students.push(student._id);
    await list.save();

    res.status(201).json({ message: 'Student added successfully', student });
  } catch (error) {
    console.error('Error adding student:', error.message);
    res.status(500).json({ message: 'Error adding student', error });
  }
};

// Delete a list
exports.deleteList = async (req, res) => {
  const { id } = req.params;

  try {
    const list = await List.findById(id);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    await Student.deleteMany({ _id: { $in: list.students } });
    await list.deleteOne();

    res.status(200).json({ message: 'List deleted successfully' });
  } catch (error) {
    console.error('Error deleting list:', error.message);
    res.status(500).json({ message: 'Error deleting list', error });
  }
};

// Update a list
exports.updateList = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'List name is required' });
  }

  try {
    const list = await List.findByIdAndUpdate(id, { name }, { new: true });
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.status(200).json({ message: 'List updated successfully', list });
  } catch (error) {
    console.error('Error updating list:', error.message);
    res.status(500).json({ message: 'Error updating list', error });
  }
};
