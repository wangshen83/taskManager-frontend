import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { formatDate } from './Utils';
import "./TaskList.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const { token, removeToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [token]);

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <div>
      <h1>Task List</h1>
      <Link to="/tasks/create">Create Task</Link>
      &nbsp;&nbsp;
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>{formatDate(task.deadline)}</p>
              <Link to={`/tasks/${task._id}/edit`}>Edit</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TaskList;
