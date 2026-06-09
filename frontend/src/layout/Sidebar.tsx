import {
  FaFolderOpen,
  FaHome,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
  FaTasks,
} from "react-icons/fa";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeClass =
    "flex items-center gap-3 bg-purple-100 text-purple-600 font-medium p-3 rounded-xl";

  const normalClass =
    "flex items-center gap-3 text-gray-600 hover:bg-purple-50 p-3 rounded-xl transition";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white shadow-md p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-purple-600 mb-10">
        ProjectTracker
      </h1>

      <nav className="flex flex-col gap-4">

        <Link
          to="/"
          className={
            location.pathname === "/"
              ? activeClass
              : normalClass
          }
        >
          <FaHome />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/projects"
          className={
            location.pathname === "/projects"
              ? activeClass
              : normalClass
          }
        >
          <FaFolderOpen />
          <span>Projects</span>
        </Link>

        <Link
          to="/add-project"
          className={
            location.pathname === "/add-project"
              ? activeClass
              : normalClass
          }
        >
          <FaPlusCircle />
          <span>Add Project</span>
        </Link>

        <Link
          to="/tasks"
          className={
            location.pathname === "/tasks"
              ? activeClass
              : normalClass
          }
        >
          <FaTasks />
          <span>Tasks</span>
        </Link>

        <Link
          to="/add-task"
          className={
            location.pathname === "/add-task"
              ? activeClass
              : normalClass
          }
        >
          <FaPlusCircle />
          <span>Add Task</span>
        </Link>

        <Link
          to="/profile"
          className={
            location.pathname === "/profile"
              ? activeClass
              : normalClass
          }
        >
          <FaUser />
          <span>Profile</span>
        </Link>

        <button
          onClick={handleLogout}
          className={normalClass}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </nav>
    </div>
  );
}

export default Sidebar;