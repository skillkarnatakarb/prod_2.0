import React, { useState, useEffect } from 'react';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { downloadStudentTemplate, createList, fetchLists, deleteList } from '../../../../api/api';

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
  const [lists, setLists] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

      await createList(formData);
      setSuccessMessage('List created successfully');
      loadLists();
      handleClose();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Error saving list. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const loadLists = async () => {
    setLoading(true);
    try {
      const data = await fetchLists();
      setLists(data);
    } catch (error) {
      setErrorMessage('Failed to fetch lists. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleting(true);
  };

  const handleDeleteList = async () => {
    if (!deleteId) {
      setErrorMessage('Invalid List ID');
      return;
    }

    try {
      await deleteList(deleteId);
      setSuccessMessage('List deleted successfully');
      loadLists();
      setDeleting(false);
    } catch (error) {
      setErrorMessage('Failed to delete list. Please try again.');
    }
  };

  useEffect(() => {
    loadLists();
  }, []);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Student List
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create a new list
      </Button>

      {/* Header Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: 'bold',
          mt: 3,
          mb: 1,
          padding: '10px 20px',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
        }}
      >
        <Typography sx={{ flex: 1 }}>Date Created</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center' }}>List Name</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center' }}>No. of Students</Typography>
        <Typography sx={{ flex: 0 }}>Action</Typography>
      </Box>

      {/* List Items */}
      <Box>
        {loading ? (
          <CircularProgress />
        ) : lists.length > 0 ? (
          lists.map((list) => (
            <Box
              key={list._id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px 20px',
                marginBottom: '10px',
                backgroundColor: '#fff',
              }}
            >
              <Typography sx={{ flex: 1 }}>{new Date(list.createdAt).toLocaleDateString()}</Typography>
              <Typography sx={{ flex: 1, textAlign: 'center' }}>{list.name}</Typography>
              <Typography sx={{ flex: 1, textAlign: 'center' }}>{list.studentCount}</Typography>
              <Button
                size="small"
                color="error"
                onClick={() => confirmDelete(list._id)}
                sx={{ flex: 0 }}
              >
                Remove
              </Button>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No data available
          </Typography>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleting} onClose={() => setDeleting(false)}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this list?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleting(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteList} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Section */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Create Student List
          </Typography>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <TextField
            label="List Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            disabled={loading}
          />
          <Box sx={{ border: '2px dashed #ccc', padding: '16px', mb: 2, textAlign: 'center' }}>
            <Typography variant="body2">Upload CSV file</Typography>
            <Input
              type="file"
              inputProps={{ accept: '.csv' }}
              onChange={handleFileChange}
              fullWidth
            />
            {csvFile && (
              <Typography mt={1}>
                File: {csvFile.name}{' '}
                <Button size="small" color="error" onClick={handleRemoveFile}>
                  Remove
                </Button>
              </Typography>
            )}
          </Box>
          <Button variant="outlined" onClick={handleDownloadTemplate} sx={{ mb: 2 }}>
            Download Template
          </Button>
          <Divider>OR</Divider>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Save List'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Student;
