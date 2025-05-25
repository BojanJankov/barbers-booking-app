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
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <button
        onClick={toggleDropdown}
        className="bg-mid text-font px-4 py-2 rounded-md shadow-md hover:bg-light transition cursor-pointer"
      >
        <i className="fa-solid fa-bars text-dark"></i>
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div
        ref={dropDownRef}
        className={`fixed top-0 right-0 h-full w-64 bg-dark shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={toggleDropdown}
            className="text-light text-2xl cursor-pointer"
          >
            &times;
          </button>
        </div>
        <ul className="px-4 py-2 text-font space-y-2">
          {user?.role === "barber" ? (
            user?.barber ? (
              <li
                className="px-4 py-2 hover:bg-mid cursor-pointer rounded"
                onClick={() => {
                  navigate(`edit-barber/${user.barber.id}`);
                  setIsOpen(false);
                }}
              >
                Edit profile
              </li>
            ) : (
              <li
                className="px-4 py-2 hover:bg-mid cursor-pointer rounded"
                onClick={() => {
                  navigate("add-barber");
                  setIsOpen(false);
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
              className="px-4 py-2 hover:bg-mid cursor-pointer rounded"
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DropdownMenu;
