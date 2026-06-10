import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

function AddTask() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "Pending",
    priority: "Medium",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    console.log(formData);

    try {
      const token =
        localStorage.getItem("token");

      await axios.post(
        "https://project-management-system-fjma.onrender.com/api/tasks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task created successfully");

      navigate("/tasks");
    } catch (error) {
      console.error(error);

      alert("Failed to create task");
    }
  };

  return (
    <MainLayout>
      <div className="p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Add Task
        </h1>

        <p className="text-gray-500 mb-10">
          Create a new task.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm p-8 max-w-3xl"
        >
          <div className="grid grid-cols-2 gap-6">
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              className="bg-gray-100 p-4 rounded-xl outline-none"
              required
            />

            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="bg-gray-100 p-4 rounded-xl outline-none"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="bg-gray-100 p-4 rounded-xl outline-none"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="bg-gray-100 p-4 rounded-xl outline-none"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <textarea
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-gray-100 p-4 rounded-xl outline-none mt-6 h-40"
          />

          <button
            type="submit"
            className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
          >
            Save Task
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

export default AddTask;