import { NavLink } from "react-router-dom";
import { NavLinkModel } from "../../Models/core.model";

function Navbar() {
  const navLinks: NavLinkModel[] = [
    {
      path: "/",
      text: "Home",
    },
    {
      path: "/about",
      text: "About",
    },
    {
      path: "/contact",
      text: "Contact",
    },
    {
      path: "/barbers",
      text: "Barbers",
    },
  ];

  return (
    <nav className="flex items-center justify-center gap-5">
      <ul className="flex gap-5 text-lg">
        {navLinks.map((link, i) => (
          <li key={i}>
            <NavLink
              to={link.path}
              className="ease-in-out duration-75 text-font hover:text-light"
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
