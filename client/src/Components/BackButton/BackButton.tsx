import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function BackButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-30 left-4 z-50 flex items-center gap-2 rounded-2xl bg-mid text-font px-4 py-2 shadow-md hover:bg-light transition cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="text-sm font-medium">{t("back-button-text")}</span>
    </button>
  );
}
