import { useContext } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../../Components/DropDownMenu/DropDownMenu";
import { LanguageSwitcher } from "../../Components/LanguageSwitcher/LanguageSwitcher";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { accessToken, user, logout } = useContext(AuthContext);

  const menuItems = [
    {
      text: "Your scheduled terms",
      onClick: () => {
        navigate(`/barber-appointments/${user?.barber.id}`);
      },
    },
    {
      text: "Logout",
      onClick: () => {
        logout();
        navigate("/login");
      },
    },
  ];

  return (
    <header className="bg-dark px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-y-3 md:gap-y-0">
      <div className="hidden md:block text-font text-2xl font-bold tracking-wide">
        <h1 className="cursor-pointer" onClick={() => navigate("/")}>
          BarberBook
        </h1>
      </div>

      <div className="w-full md:w-auto">
        <Navbar />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2 text-font">
        {accessToken ? (
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-user text-[#b08968] text-xl"></i>
            <span className="font-semibold">{user?.username}</span>
            <DropdownMenu menuItems={menuItems} />
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-2">
            {/* <button
              className="bg-[#b08968] hover:bg-[#a17459] text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow cursor-pointer"
              onClick={() => navigate("register")}
            >
              Register your business
            </button> */}
            {/* <span className="text-sm text-font">or</span> */}
            <button
              className="bg-[#b08968] hover:bg-[#a17459] text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow cursor-pointer"
              onClick={() => navigate("login")}
            >
              Login
            </button>
          </div>
        )}
        <LanguageSwitcher />
      </div>
    </header>
  );
}

export default Header;
