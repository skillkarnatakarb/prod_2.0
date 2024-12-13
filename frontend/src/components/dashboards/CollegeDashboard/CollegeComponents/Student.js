import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Divider,
  Input,
  Alert,
  CircularProgress,
} from '@mui/material';
import { downloadStudentTemplate, createList } from '../../../../api/api';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '8px',
  p: 4,
};

const Student = () => {
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    if (loading) {
      alert('Please wait for the upload to finish before closing.');
      return;
    }
    resetState();
    setOpen(false);
  };

  const resetState = () => {
    setListName('');
    setCsvFile(null);
    setFileError('');
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setFileError('File must have a .csv extension');
      setCsvFile(null);
    } else if (file.size > MAX_FILE_SIZE) {
      setFileError('File size exceeds the 2MB limit');
      setCsvFile(null);
    } else if (file.type !== 'text/csv') {
      setFileError('Invalid file type. Please upload a CSV file.');
      setCsvFile(null);
    } else {
      setFileError('');
      setCsvFile(file);
    }
  };

  const handleRemoveFile = () => {
    setCsvFile(null);
    setFileError('');
  };

  const handleDownloadTemplate = async () => {
    try {
      await downloadStudentTemplate();
      alert('Template downloaded successfully');
    } catch (error) {
      console.error('Error downloading template:', error.message);
      setErrorMessage('Failed to download template. Please try again.');
    }
  };

  const handleSave = async () => {
    if (!listName.trim()) {
      setErrorMessage('List name cannot be empty');
      return;
    }

    const invalidNamePattern = /[^a-zA-Z0-9 _-]/;
    if (invalidNamePattern.test(listName)) {
      setErrorMessage('List name contains invalid characters');
      return;
    }

    if (!csvFile) {
      setErrorMessage('Please upload a valid CSV file');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const formData = new FormData();
      formData.append('name', listName);
      formData.append('csvFile', csvFile);

      const response = await createList(formData);
      setSuccessMessage('List created successfully');
      console.log('List created:', response);

      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      handleClose();
    } catch (error) {
      console.error('Error saving list:', error.message);
      setErrorMessage(
        error.response?.data?.message || 'Error saving list. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Student List
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create a new list
      </Button>

      <Box mt={3}>
        <Typography variant="body1">0 records</Typography>
        <Typography variant="body2" color="text.secondary">
          No data available
        </Typography>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Create Student List
          </Typography>
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          <TextField
            label="List Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            disabled={loading}
          />
          <Box
            sx={{
              border: '2px dashed #ccc',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center',
              mb: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Upload CSV file
            </Typography>
            <Input
              type="file"
              inputProps={{ accept: '.csv' }}
              onChange={handleFileChange}
              disableUnderline
              fullWidth
              style={{ marginTop: '8px' }}
              disabled={loading}
            />
            {csvFile && (
              <Typography variant="body2" color="text.primary" mt={1}>
                File: {csvFile.name}{' '}
                <Button
                  size="small"
                  color="error"
                  onClick={handleRemoveFile}
                  disabled={loading}
                >
                  Remove
                </Button>
              </Typography>
            )}
            {fileError && (
              <Typography variant="body2" color="error" mt={1}>
                {fileError}
              </Typography>
            )}
          </Box>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ textTransform: 'none', mb: 2 }}
            onClick={handleDownloadTemplate}
            disabled={loading}
          >
            Download Template
          </Button>
          <Divider>OR</Divider>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="text" color="error" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Save List'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Student;
