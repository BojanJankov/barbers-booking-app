import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const switchLanguage = (lng: "en" | "mk") => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropDownRef} className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-mid text-font border border-border rounded-md hover:bg-light transition cursor-pointer"
      >
        {currentLang.toUpperCase()}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-dark border border-border rounded-md shadow-lg z-50">
          <button
            onClick={() => switchLanguage("en")}
            className="block w-full text-left px-4 py-2 text-font hover:bg-light cursor-pointer"
          >
            EN
          </button>
          <button
            onClick={() => switchLanguage("mk")}
            className="block w-full text-left px-4 py-2 text-font hover:bg-light cursor-pointer"
          >
            MK
          </button>
        </div>
      )}
    </div>
  );
}
