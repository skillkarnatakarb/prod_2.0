import React from 'react';

const ListCard = ({ list, onDelete }) => (
  <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
    <h3>{list.name}</h3>
    <p>Created At: {new Date(list.createdAt).toLocaleDateString()}</p>
    <p>Students: {list.students.length}</p>
    <button onClick={() => onDelete(list._id)}>Delete</button>
  </div>
);

export default ListCard;
