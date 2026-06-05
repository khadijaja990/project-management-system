import { Link } from "react-router-dom";
import {
  FaFolderOpen,
  FaTasks,
  FaCheckCircle,
} from "react-icons/fa";

import MainLayout from "../layout/MainLayout";

function Dashboard() {
  return (
    <MainLayout>
      <div className="flex-1 p-10">
        {/* Top Profile */}
        <div className="flex justify-end items-center mb-8">
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center font-bold text-purple-700">
              K
            </div>

            <div>
              <p className="font-semibold text-gray-800">
                Khadijah
              </p>

              <p className="text-sm text-gray-500">
                Project Manager
              </p>
            </div>
          </div>
        </div>

        {/* Welcome */}
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome back 👋
        </h2>

        <p className="text-gray-500 mb-10">
          Manage and track your projects efficiently.
        </p>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-lg text-gray-500">
                Total Projects
              </h3>

              <p className="text-4xl font-bold text-purple-600 mt-4">
                12
              </p>
            </div>

            <div className="bg-purple-100 p-4 rounded-2xl">
              <FaFolderOpen className="text-purple-600 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-lg text-gray-500">
                Active Projects
              </h3>

              <p className="text-4xl font-bold text-yellow-500 mt-4">
                6
              </p>
            </div>

            <div className="bg-yellow-100 p-4 rounded-2xl">
              <FaTasks className="text-yellow-500 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-lg text-gray-500">
                Completed Projects
              </h3>

              <p className="text-4xl font-bold text-green-500 mt-4">
                4
              </p>
            </div>

            <div className="bg-green-100 p-4 rounded-2xl">
              <FaCheckCircle className="text-green-500 text-2xl" />
            </div>
          </div>

        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-2xl shadow-sm mt-10 p-6">

          <div className="flex justify-between items-center mb-6">

            <h3 className="text-2xl font-bold text-gray-800">
              Recent Projects
            </h3>

            <Link
              to="/add-project"
              className="bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-700 transition"
            >
              Add Project
            </Link>

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

              <tr className="border-b">
                <td className="py-4">
                  E-Commerce Website
                </td>

                <td>
                  ABC Company
                </td>

                <td>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    In Progress
                  </span>
                </td>

                <td>
                  2026-07-15
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-4">
                  Inventory System
                </td>

                <td>
                  XYZ Store
                </td>

                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Completed
                  </span>
                </td>

                <td>
                  2026-06-30
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;