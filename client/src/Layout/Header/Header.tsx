import { useContext } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../../Components/DropDownMenu/DropDownMenu";

function Header() {
  const navigate = useNavigate();
  const { accessToken, user, logout } = useContext(AuthContext);

  const menuItems = [
    {
      text: "Scheduled terms",
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
    <header className="bg-dark shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-font text-3xl font-bold tracking-wide">
        <h1 className="cursor-pointer" onClick={() => navigate("/")}>
          BarberBook
        </h1>
      </div>
      <Navbar />
      <div>
        {accessToken ? (
          <div className="text-font text-lg font-semibold flex items-center gap-3">
            <i className="fa-solid fa-user text-[#b08968] text-xl"></i>
            <span>{user?.username}</span>
            <DropdownMenu menuItems={menuItems} />
          </div>
        ) : (
          <button
            className="bg-[#b08968] hover:bg-[#a17459] text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow cursor-pointer"
            onClick={() => navigate("register")}
          >
            Register a Barber
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
