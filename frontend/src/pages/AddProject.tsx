import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

function AddProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied",
    application_date: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
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

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/projects",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project added successfully");
      navigate("/projects");
    } catch (error) {
      console.error(error);
      alert("Failed to save project");
    }
  };

  return (
    <MainLayout>
      <div className="p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Add Project
        </h1>

        <p className="text-gray-500 mb-10">
          Create and manage a new project.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm p-8 max-w-3xl"
        >
          <div className="grid grid-cols-2 gap-6">

            <input
              type="text"
              name="company"
              placeholder="Project Name"
              value={formData.company}
              onChange={handleChange}
              className="bg-gray-100 p-4 rounded-xl outline-none"
              required
            />

            <input
              type="text"
              name="position"
              placeholder="Client Name"
              value={formData.position}
              onChange={handleChange}
              className="bg-gray-100 p-4 rounded-xl outline-none"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="bg-gray-100 p-4 rounded-xl outline-none"
            >
              <option>Applied</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <input
              type="date"
              name="application_date"
              value={formData.application_date}
              onChange={handleChange}
              className="bg-gray-100 p-4 rounded-xl outline-none"
              required
            />

          </div>

          <textarea
            name="notes"
            placeholder="Project Description"
            value={formData.notes}
            onChange={handleChange}
            className="w-full bg-gray-100 p-4 rounded-xl outline-none mt-6 h-40"
          />

          <button
            type="submit"
            className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
          >
            Save Project
          </button>

        </form>
      </div>
    </MainLayout>
  );
}

export default AddProject;