import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout";
import { Link, useNavigate } from "react-router-dom";

function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<any[]>([]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://project-management-system-fjma.onrender.com/api/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://project-management-system-fjma.onrender.com/api/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(
        projects.filter(
          (project) => project.id !== id
        )
      );

      alert("Project deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <MainLayout>
      <div className="p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Projects
        </h1>

        <p className="text-gray-500 mb-10">
          Manage and monitor all project activities.
        </p>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              All Projects
            </h2>

            <button
              onClick={() =>
                navigate("/add-project")
              }
              className="bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-700"
            >
              Add Project
            </button>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-4">
                  Project Name
                </th>

                <th className="pb-4">
                  Description
                </th>

                <th className="pb-4">
                  Status
                </th>

                <th className="pb-4">
                  Start Date
                </th>

                <th className="pb-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project: any) => (
                <tr
                  key={project.id}
                  className="border-b hover:bg-purple-50 transition"
                >
                  <td className="py-4">
                    {project.name}
                  </td>

                  <td>
                    {project.description}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        project.status === "Planning"
                          ? "bg-blue-100 text-blue-700"
                          : project.status ===
                            "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>

                  <td>
                    {project.start_date
                      ? new Date(
                          project.start_date
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/edit-project/${project.id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(project.id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </MainLayout>
  );
}

export default Projects;