import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { formatDate } from './Utils';
import './TaskEdit.css';

function TaskEdit() {
  const { id } = useParams();
  const [, setTask] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTask(data);
        setTitle(data.title);
        setDescription(data.description);
        setDeadline(formatDate(data.deadline));
      })
      .catch((error) => console.error('Error fetching task:', error));
  }, [id, token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTaskData = {
      title,
      description,
      deadline,
    };

    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedTaskData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Task updated:', data);
        navigate('/');
      })
      .catch((error) => console.error('Error updating task:', error));
  };

  return (
    <div className="container">
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Deadline:
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default TaskEdit;