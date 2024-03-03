import { useNavigate } from "react-router-dom";
import { UserAuth } from "../authRelated/Authcontext";

const Sidebarnav = () => {
  const { currentUser, logOut } = UserAuth();
  const navigate = useNavigate();

  console.log(currentUser && currentUser);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="flex flex-row relative justify-between h-full items-center p-2 bg-gray-700 text-white">
        <div>
          <img
            className="rounded-xl h-12 mx-auto"
            src="https://www.app-download.com/files/image/app/watchchat-2-fuer-whatsapp-icon.jpg"
            alt="logo"
          />
        </div>
        <div className="relative group cursor-pointer">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" h-8 w-8 rounded-full object-cover object-center"
              src={
                currentUser && currentUser?.photoURL
                  ? currentUser?.photoURL
                  : "https://static-00.iconduck.com/assets.00/user-avatar-1-icon-2048x2048-935gruik.png"
              }
              alt={
                currentUser?.displayName
                  ? `${currentUser?.displayName}`
                  : "user"
              }
            />
            {currentUser?.displayName ? currentUser?.displayName : "user"}
          </div>

          <div className=" absolute hidden group-hover:flex top-15 right-0">
            <button
              className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-600 border border-red-700 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebarnav;
