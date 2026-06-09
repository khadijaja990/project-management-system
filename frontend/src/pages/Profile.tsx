import MainLayout from "../layout/MainLayout";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <MainLayout>
      <div className="p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Profile
        </h1>

        <p className="text-gray-500 mb-10">
          Manage your profile information.
        </p>

        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-2xl">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-purple-200 flex items-center justify-center text-4xl font-bold text-purple-700">
              {user?.name?.charAt(0)?.toUpperCase() ||
                "U"}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {user?.name || "User"}
              </h2>

              <p className="text-gray-500">
                {user?.email || "No Email"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-gray-500 text-sm">
                Full Name
              </label>

              <input
                type="text"
                value={user?.name || ""}
                className="w-full mt-2 bg-gray-100 p-3 rounded-xl outline-none"
                readOnly
              />
            </div>

            <div>
              <label className="text-gray-500 text-sm">
                Role
              </label>

              <input
                type="text"
                value="Project Manager"
                className="w-full mt-2 bg-gray-100 p-3 rounded-xl outline-none"
                readOnly
              />
            </div>
          </div>

          <button className="mt-8 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition">
            Save Changes
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

export default Profile;