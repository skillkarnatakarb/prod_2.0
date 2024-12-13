import React, { useState } from 'react';
import { addStudent } from '../../../api/api';

const AddStudentModal = ({ listId, onClose, onStudentAdded }) => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    phone: '',
    collegeName: '',
    education: '',
    specialization: '',
    semester: '',
  });

  const handleInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const response = await addStudent({ ...student, listId });
    onStudentAdded(response);
    onClose();
  };

  return (
    <div>
      <h2>Add Student</h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={student.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleInputChange}
        />
        {/* Add more fields here */}
        <button onClick={handleSubmit}>Add Student</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddStudentModal;
