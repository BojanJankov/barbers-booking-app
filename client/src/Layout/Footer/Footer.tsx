import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <section className="flex items-center justify-center bg-transparent h-20 font-bold ">
      <small className="text-light">{t("footer-text")}</small>
    </section>
  );
}

export default Footer;
