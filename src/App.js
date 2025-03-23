import React, { useState } from "react";
import "./styles.css";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    completionStatus: false,
  });
  const [editId, setEditId] = useState(null); // Track the task being edited

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== null) {
      // Update Task
      setTasks(
        tasks.map((task) =>
          task.id === editId ? { ...form, id: editId } : task
        )
      );
      setEditId(null); // Clear edit state after updating
    } else {
      // Add New Task
      setTasks([...tasks, { ...form, id: Date.now() }]);
    }
    setForm({
      title: "",
      description: "",
      dueDate: "",
      completionStatus: false,
    }); // Reset form
  };

  const handleEdit = (task) => {
    setForm(task); // Pre-fill the form with the selected task's data
    setEditId(task.id); // Set the ID of the task being edited
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completionStatus: !task.completionStatus }
          : task
      )
    );
  };

  return (
    <div className="app-container">
      <h1>Task Management</h1>
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          required
        />
        <label>
          Completed:
          <input
            type="checkbox"
            name="completionStatus"
            checked={form.completionStatus}
            onChange={(e) =>
              setForm({ ...form, completionStatus: e.target.checked })
            }
          />
        </label>
        <button type="submit">
          {editId !== null ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-card ${
              task.completionStatus ? "completed" : "incomplete"
            }`}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <p>Status: {task.completionStatus ? "Completed" : "Incomplete"}</p>
            <button onClick={() => toggleCompletion(task.id)}>
              Toggle Completion
            </button>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
