import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-0">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-font mb-6">
          {t("about-us-title")}
        </h1>
        <p className="text-lg md:text-2xl text-font leading-relaxed">
          {t("about-us-text-one")}
        </p>
        <p className="text-lg md:text-2xl text-font leading-relaxed mt-6">
          {t("about-us-text-two")}
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
