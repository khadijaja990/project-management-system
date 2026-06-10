import { useEffect, useState } from "react";
import axios from "axios";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "",
    application_date: "",
    notes: "",
  });

  useEffect(() => {
    const loadProject = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/projects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const project =
          response.data.find(
            (p: any) =>
              p.id === Number(id)
          );

        if (project) {
          setFormData({
            company: project.company,
            position: project.position,
            status: project.status,
            application_date:
              project.application_date?.split(
                "T"
              )[0] || "",
            notes: project.notes,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadProject();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/projects/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Project updated successfully"
      );

      navigate("/projects");
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  return (
    <MainLayout>
      <div className="p-10">
        <h1 className="text-4xl font-bold mb-6">
          Edit Project
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-sm"
        >
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Project Name"
            className="w-full p-4 bg-gray-100 rounded-xl mb-4"
          />

          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Client"
            className="w-full p-4 bg-gray-100 rounded-xl mb-4"
          />

          <input
            type="date"
            name="application_date"
            value={formData.application_date}
            onChange={handleChange}
            className="w-full p-4 bg-gray-100 rounded-xl mb-4"
          />

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-4 bg-gray-100 rounded-xl mb-4"
          />

          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-xl"
          >
            Update Project
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

export default EditProject;