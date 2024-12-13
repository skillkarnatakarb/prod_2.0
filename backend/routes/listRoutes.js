const express = require('express');
const multer = require('multer');
const {
  downloadTemplate,
  saveList,
  getLists,
  getList,
  addStudent,
  deleteList,
  updateList,
} = require('../controllers/listController');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/', // Temporary storage for uploaded files
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
      cb(null, true); // Accept only CSV files
    } else {
      console.warn(`Invalid file type uploaded: ${file.mimetype}`);
      cb(new Error('Only CSV files are allowed!'), false); // Reject invalid files
    }
  },
});

// Middleware for handling multer errors
const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error(`Multer Error: ${err.message}`);
    return res.status(400).json({ message: 'File upload error', error: err.message });
  } else if (err) {
    console.error(`File Upload Error: ${err.message}`);
    return res.status(400).json({ message: 'File upload failed', error: err.message });
  }
  next();
};

// Route to download the CSV template
router.get('/download-template', async (req, res, next) => {
  try {
    await downloadTemplate(req, res);
  } catch (error) {
    console.error('Error in /download-template:', error.message);
    res.status(500).json({ message: 'Failed to download template', error: error.message });
  }
});

// Route to create and save a new list
router.post(
  '/save-list',
  upload.single('csvFile'), // Handle single file upload
  handleMulterErrors, // Middleware to catch upload errors
  async (req, res, next) => {
    try {
      await saveList(req, res);
    } catch (error) {
      console.error('Error in /save-list:', error.message);
      res.status(500).json({ message: 'Failed to save list', error: error.message });
    }
  }
);

// Route to fetch all lists
router.get('/get-lists', async (req, res, next) => {
  try {
    await getLists(req, res);
  } catch (error) {
    console.error('Error in /get-lists:', error.message);
    res.status(500).json({ message: 'Failed to fetch lists', error: error.message });
  }
});

// Route to fetch details of a specific list by ID
router.get('/get-list/:id', async (req, res, next) => {
  try {
    await getList(req, res);
  } catch (error) {
    console.error(`Error in /get-list/${req.params.id}:`, error.message);
    res.status(500).json({ message: 'Failed to fetch list details', error: error.message });
  }
});

// Route to add a student to a specific list
router.post('/add-student', async (req, res, next) => {
  try {
    await addStudent(req, res);
  } catch (error) {
    console.error('Error in /add-student:', error.message);
    res.status(500).json({ message: 'Failed to add student', error: error.message });
  }
});

// Route to delete a specific list by ID
router.delete('/delete-list/:id', async (req, res, next) => {
  try {
    await deleteList(req, res);
  } catch (error) {
    console.error(`Error in /delete-list/${req.params.id}:`, error.message);
    res.status(500).json({ message: 'Failed to delete list', error: error.message });
  }
});

// Route to update a list's name or other attributes
router.put('/update-list/:id', async (req, res, next) => {
  try {
    await updateList(req, res);
  } catch (error) {
    console.error(`Error in /update-list/${req.params.id}:`, error.message);
    res.status(500).json({ message: 'Failed to update list', error: error.message });
  }
});

// Export the router
module.exports = router;
