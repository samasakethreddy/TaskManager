import React, { useEffect, useState } from 'react';
import axios from '../services/axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  // Fetch tasks from the server
  const fetchTasks = async () => {
    setLoading(true); // Start loading
    try {
      const res = await axios.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle adding or editing a task
  const handleEditTask = async (taskData) => {
    try {
      if (editTask) {
        await axios.put(`/tasks/${editTask.ID}`, taskData);
      } else {
        await axios.post('/tasks', taskData);
      }
      fetchTasks();
    } catch (error) {
      console.error('Error submitting task:', error);
    } finally {
      setEditTask(null);
      setShowForm(false); // Close modal
    }
  };

  // Open the form for a new task
  const handleNewTask = () => {
    setEditTask(null);
    setShowForm(true);
  };

  // Open the form for editing an existing task
  const handleEditClick = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Task Dashboard</h2>
        <div>
          <button className="btn btn-primary me-2" onClick={handleNewTask}>Add New Task</button>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Display loading state */}
      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <TaskList
          tasks={tasks}
          onTaskChange={fetchTasks}
          onEditClick={handleEditClick}
        />
      )}

      {/* Bootstrap Modal */}
      {showForm && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editTask ? "Edit Task" : "Add New Task"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
              </div>
              <div className="modal-body">
                <TaskForm
                  editTask={editTask}
                  onSubmit={handleEditTask}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
