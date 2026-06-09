import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout";

function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(
        tasks.filter(
          (task) => task.id !== id
        )
      );

      alert("Task deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <MainLayout>
      <div className="p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Tasks
        </h1>

        <p className="text-gray-500 mb-10">
          Manage project tasks.
        </p>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="pb-4">Title</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Priority</th>
                <th className="pb-4">Due Date</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b"
                >
                  <td className="py-4">
                    {task.title}
                  </td>

                  <td>
                    {task.status}
                  </td>

                  <td>
                    {task.priority}
                  </td>

                  <td>
                    {task.due_date
                      ? new Date(
                          task.due_date
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        handleDelete(task.id)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
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

export default Tasks;