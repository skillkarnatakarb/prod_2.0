import React, { useState } from 'react';
import { addStudent } from '../../../api/api';

const AddStudentModal = ({ listId, onClose, onStudentAdded }) => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    collegeName: '',
    education: '',
    specialization: '',
    semester: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await addStudent({ ...student, listId });
      onStudentAdded(response.data);
      onClose();
    } catch (error) {
      console.error('Error adding student:', error.response?.data || error.message);
    }
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
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={student.phoneNumber}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="collegeName"
          placeholder="College Name"
          value={student.collegeName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="education"
          placeholder="Education"
          value={student.education}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={student.specialization}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="semester"
          placeholder="Semester"
          value={student.semester}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Add Student</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddStudentModal;
