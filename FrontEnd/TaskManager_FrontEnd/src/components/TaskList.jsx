import React from 'react';
import axios from '../services/axios';
import "../App.css";

const TaskList = ({ tasks, onTaskChange, onEditClick }) => {
  const handleDelete = async (id) => {
    await axios.delete(`/tasks/${id}`);
    onTaskChange();
  };

  return (
    <div>
      <h3>Tasks</h3>

      {(!tasks || tasks.length === 0) ? (
        <div className="mt-4 opacity-50" >No tasks found.</div>
      ) : (
        <ul className="list-group mt-4">
          {tasks.map((task) => (
            <li key={task.ID} className="list-group-item">
              <div><strong>{task.title}</strong></div>
              <div>{task.description}</div>
              <div>
                <span className="badge bg-secondary">{task.status}</span> - Due: {new Date(task.dueDate).toLocaleDateString()}
              </div>
              <div className="mt-2">
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => onEditClick(task)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(task.ID)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
