import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userData"));

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-yellow-400 text-center px-4">
        No user found
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white px-4 sm:px-6 md:px-10 py-8">

      {/* LOGOUT BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="bg-yellow-500 text-black px-4 sm:px-6 py-2 rounded-[8px] font-bold text-sm sm:text-base"
        >
          Logout
        </button>
      </div>

      {/* DASHBOARD CARD */}
      <div className="w-full sm:w-[90%] md:w-[75%] lg:w-[55%] xl:w-[40%] m-auto border border-yellow-500 rounded-[12px] p-5 sm:p-6 md:p-8 mt-6 sm:mt-10 shadow-lg shadow-yellow-500/20">

        <h1 className="text-center text-yellow-400 text-[22px] sm:text-[26px] md:text-[30px] font-bold mb-6">
          USER DASHBOARD
        </h1>

        {/* IMAGE */}
        <div className="flex justify-center mb-6 flex-col items-center">

          <img
            src={
              user?.photo
                ? user.photo
                : "https://via.placeholder.com/150"
            }
            className="w-[90px] sm:w-[110px] md:w-[120px] h-[90px] sm:h-[110px] md:h-[120px] rounded-full border-4 border-white object-cover bg-gray-800"
            alt="user"
          />

        </div>

        {/* USER INFO */}
        <div className="space-y-3 text-sm sm:text-base md:text-lg">

          <p>
            <span className="text-yellow-400">Email:</span>{" "}
            <span className="text-white break-all">{user.email}</span>
          </p>

          <p>
            <span className="text-yellow-400">First Name:</span>{" "}
            <span className="text-white break-all">{user.firstName}</span>
          </p>

          <p>
            <span className="text-yellow-400">Last Name:</span>{" "}
            <span className="text-white">{user.lastName}</span>
          </p>

          <p>
            <span className="text-yellow-400">Country:</span>{" "}
            <span className="text-white">{user.country}</span>
          </p>

          <p>
            <span className="text-yellow-400">Phone:</span>{" "}
            <span className="text-white">{user.phoneNumber}</span>
          </p>

        </div>
      </div>

      {/* LOGOUT CONFIRM MODAL */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center px-4">

          <div className="bg-gray-900 border border-yellow-500 p-5 sm:p-6 rounded-[10px] text-center w-full max-w-[320px]">

            <p className="text-yellow-400 mb-4 text-sm sm:text-base">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-center gap-3">

              <button
                onClick={handleLogout}
                className="bg-yellow-500 text-black px-4 py-2 rounded-[6px] font-semibold text-sm"
              >
                Yes
              </button>

              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-gray-700 text-white px-4 py-2 rounded-[6px] text-sm"
              >
                No
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Dashboard;