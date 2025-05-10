import { useState, useEffect } from "react";
import axios from "axios";

export default function TaskForm({ editTask, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title,
        description: editTask.description,
        status: editTask.status,
        dueDate: editTask.dueDate?.slice(0, 10) || "",
      });
    }
  }, [editTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, status, dueDate } = formData;

    if (!title || !description || !status || !dueDate) {
      setError("All fields are required.");
      return;
    }

    await onSubmit(formData);

    setFormData({
      title: "",
      description: "",
      status: "pending",
      dueDate: "",
    });
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded bg-light shadow-sm">
      {/* <h4 className="mb-3">Add / Edit Task</h4> */}

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          className="form-select"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Due Date</label>
        <input
          className="form-control"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-primary" type="submit">
        {editTask ? "Edit Task" : "Save Task"} {/* Change button text based on whether task is being edited */}
      </button>
    </form>
  );
}
