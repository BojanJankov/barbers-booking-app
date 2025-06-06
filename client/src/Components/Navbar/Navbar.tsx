import { NavLink } from "react-router-dom";
import { NavLinkModel } from "../../Models/core.model";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t } = useTranslation();
  const navLinks: NavLinkModel[] = [
    {
      path: "/",
      text: t("nav-links-home"),
    },
    {
      path: "/about",
      text: t("nav-links-about"),
    },
    {
      path: "/contact",
      text: t("nav-links-contact"),
    },
    {
      path: "/barbers",
      text: t("nav-links-barbers"),
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
