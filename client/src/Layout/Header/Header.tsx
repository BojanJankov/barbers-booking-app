import { useContext } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../../Components/DropDownMenu/DropDownMenu";

function Header() {
  const navigate = useNavigate();
  const { accessToken, user, logout } = useContext(AuthContext);

  const menuItems = [
    { text: "Settings", onClick: () => "" },
    {
      text: "Logout",
      onClick: () => {
        logout();
        navigate("/login");
      },
    },
  ];

  return (
    <section className="flex items-center justify-between h-20 bg-transparent p-6">
      <div className="text-light text-2xl font-bold">
        <h1>BarberBook</h1>
      </div>
      <Navbar />
      <div>
        {accessToken ? (
          <div className="text-light text-2xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-user"></i>
            <p>{user?.username}</p>
            <DropdownMenu menuItems={menuItems} />
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              className="bg-light hover:bg-mid cursor-pointer text-font px-4 py-2 rounded-md"
              onClick={() => {
                navigate("login");
              }}
            >
              Login
            </button>
            <button
              className="bg-light hover:bg-mid cursor-pointer text-font px-4 py-2 rounded-md"
              onClick={() => {
                navigate("register");
              }}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Header;
