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
import {
  downloadStudentTemplate,
  createList,
  fetchLists,
  deleteList,
  fetchStudentsByList,
} from '../../../../api/api';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '8px',
  p: 4,
  overflowY: 'auto',
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
  const [students, setStudents] = useState([]);
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [currentListName, setCurrentListName] = useState('');

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
      setLoading(true);
      await deleteList(deleteId);
      setSuccessMessage('List deleted successfully');
      loadLists();
      setDeleting(false);
    } catch (error) {
      setErrorMessage('Failed to delete list. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewStudents = async (listId, listName) => {
    try {
      setLoading(true);
      const data = await fetchStudentsByList(listId);
      setStudents(data);
      setCurrentListName(listName);
      setStudentModalOpen(true);
    } catch (error) {
      setErrorMessage('Failed to fetch students.');
    } finally {
      setLoading(false);
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
        <Typography sx={{ flex: 1 }}>List Name</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center' }}>No. of Students</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center' }}>Action</Typography>
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
              <Typography sx={{ flex: 1,paddingRight:20 }}>{list.name}</Typography>
              <Typography sx={{ flex: 1, textAlign: 'left' }}>{list.studentCount}</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleViewStudents(list._id, list.name)}
                >
                  View Students
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => confirmDelete(list._id)}
                >
                  Remove
                </Button>
              </Box>
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
          <DialogContentText>
            Are you sure you want to delete this list?
          </DialogContentText>
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

      {/* View Students Modal */}
     {/* View Students Modal */}
<Modal open={studentModalOpen} onClose={() => setStudentModalOpen(false)}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxHeight: '80%',
      bgcolor: 'background.paper',
      boxShadow: 24,
      borderRadius: '8px',
      p: 3,
      overflowY: 'auto',
    }}
  >
    {/* List Name Header */}
    <Typography
      variant="h5"
      align="center"
      gutterBottom
      sx={{
        fontWeight: 'bold',
        mb: 3,
      }}
    >
      Students in List: {currentListName}
    </Typography>

    {/* Table for Students */}
    <Box sx={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'center',
          border: '1px solid #ddd',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Slno</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Phone Number</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>College Name</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Education</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Specialization</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Semester</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{index + 1}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.email}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.phoneNumber}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.collegeName}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.education}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.specialization}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.semester}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} style={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                  No students found in this list.
                </Typography>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Box>
  </Box>
</Modal>




      {/* Create List Modal */}
      <Modal open={open} onClose={handleClose}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      borderRadius: '12px',
      p: 3,
    }}
  >
    {/* Modal Header */}
    <Box
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
    gap: 1, // Add spacing
  }}
>
  <Typography
    variant="h6"
    sx={{
      fontWeight: 'bold',
      whiteSpace: 'nowrap', // Prevent wrapping
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }}
  >
    ✍ Create Student List

      </Typography>
      <Button onClick={handleClose} sx={{ minWidth: 'auto', color: '#888' , width:'10px' }}>
        ✖
      </Button>
    </Box>

    {/* List Name Input */}
    <Typography variant="body1" fontWeight="bold" mb={1}>
      List Name
    </Typography>
    <TextField
      placeholder="Enter list name"
      variant="outlined"
      fullWidth
      value={listName}
      onChange={(e) => setListName(e.target.value)}
      sx={{ mb: 2 }}
    />

    {/* Upload CSV Section */}
    <Typography variant="body1" fontWeight="bold" mb={1}>
      Upload CSV
    </Typography>
    <Box
      sx={{
        border: '2px dashed #a784e6',
        backgroundColor: '#f7f5fc',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        mb: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary" mb={1}>
        Upload CSV file
      </Typography>
      <Input
        type="file"
        inputProps={{ accept: '.csv' }}
        onChange={handleFileChange}
        disableUnderline
        sx={{ cursor: 'pointer' }}
      />
      {csvFile && (
        <Typography variant="body2" color="text.primary" mt={1}>
          File: {csvFile.name}{' '}
          <Button size="small" color="error" onClick={handleRemoveFile}>
            Remove
          </Button>
        </Typography>
      )}
    </Box>

    {/* Download Template */}
    <Box textAlign="right" mb={2}>
      <Button
        variant="text"
        color="primary"
        onClick={handleDownloadTemplate}
        sx={{ textTransform: 'none', fontWeight: 'bold' }}
      >
        Download Template
      </Button>
    </Box>

    {/* Upload Button */}
    <Button
      variant="contained"
      fullWidth
      sx={{
        backgroundColor: '#8a63d2',
        '&:hover': { backgroundColor: '#7a58be' },
        mb: 1,
        textTransform: 'none',
        fontWeight: 'bold',
        color: '#fff',
      }}
      onClick={handleSave}
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload List'}
    </Button>

    {/* OR Separator */}
    <Divider sx={{ my: 2 }}>
      <Typography variant="body2" color="text.secondary">
        OR
      </Typography>
    </Divider>

    {/* Add Students Individually Button */}
    <Button
      variant="contained"
      fullWidth
      sx={{
        backgroundColor: '#8a63d2',
        '&:hover': { backgroundColor: '#7a58be' },
        textTransform: 'none',
        fontWeight: 'bold',
        color: '#fff',
      }}
      onClick={() => alert('Add Students Individually Clicked')}
    >
      Add students individually
    </Button>
  </Box>
</Modal>

    </Box>
  );
};

export default Student;
