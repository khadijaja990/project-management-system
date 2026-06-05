import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout";

function Projects() {
  // Store projects from backend
  const [projects, setProjects] = useState<any[]>([]);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
  "http://localhost:5000/api/projects",
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

    fetchProjects();
  }, []);

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

            <button className="bg-purple-600 text-white px-5 py-2 rounded-xl">
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
                  Client
                </th>

                <th className="pb-4">
                  Status
                </th>

                <th className="pb-4">
                  Deadline
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
                    {project.company}
                  </td>

                  <td>
                    {project.position}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        project.status === "Planning"
                          ? "bg-blue-100 text-blue-700"
                          : project.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>

                  <td>
                    {new Date(
                      project.application_date
                    ).toLocaleDateString()}
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