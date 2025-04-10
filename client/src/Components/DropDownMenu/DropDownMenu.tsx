import { useState } from "react";

interface DropdownMenuProps {
  menuItems: {
    text: string;
    onClick?: () => void;
  }[];
}

const DropdownMenu = ({ menuItems }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="bg-mid text-font px-4 py-2 rounded-md shadow-md hover:bg-light transition cursor-pointer"
      >
        <i className="fa-solid fa-caret-down"></i>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-dark ring-1 ring-border z-10 transition-transform duration-300 ease-out origin-top-right
            ${
              isOpen
                ? "scale-x-100 opacity-100"
                : "scale-x-0 opacity-0 pointer-events-none"
            }`}
          style={{ transformOrigin: "right" }}
        >
          <ul className="py-1 text-font">
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className="px-4 py-2 hover:bg-light cursor-pointer"
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
