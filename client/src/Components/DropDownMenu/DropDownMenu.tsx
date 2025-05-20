import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface DropdownMenuProps {
  menuItems: {
    text: string;
    onClick?: () => void;
  }[];
}

const DropdownMenu = ({ menuItems }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="bg-mid text-font px-4 py-2 rounded-md shadow-md hover:bg-light transition cursor-pointer"
      >
        <i className="fa-solid fa-caret-down text-dark"></i>
      </button>

      {isOpen && (
        <div
          ref={dropDownRef}
          className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-dark ring-1 ring-border z-10 transition-transform duration-300 ease-out origin-top-right
            ${
              isOpen
                ? "scale-x-100 opacity-100"
                : "scale-x-0 opacity-0 pointer-events-none"
            }`}
          style={{ transformOrigin: "right" }}
        >
          <ul className="py-1 text-light">
            {user?.role === "barber" ? (
              user?.barber ? (
                <li
                  className="px-4 py-2 hover:bg-mid cursor-pointer"
                  onClick={() => {
                    navigate(`edit-barber/${user.barber.id}`);
                  }}
                >
                  Edit profile
                </li>
              ) : (
                <li
                  className="px-4 py-2 hover:bg-mid cursor-pointer"
                  onClick={() => {
                    navigate("add-barber");
                  }}
                >
                  Add profile
                </li>
              )
            ) : null}
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className="px-4 py-2 hover:bg-mid cursor-pointer"
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
