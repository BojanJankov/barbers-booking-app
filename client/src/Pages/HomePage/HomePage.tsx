import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <main className="flex flex-col lg:flex-row items-center justify-center flex-1 p-8 gap-12">
        <div className="text-center lg:text-left max-w-lg">
          <h2 className="text-5xl font-bold text-font mb-4">BarberBook</h2>
          <p className="text-lg text-font mb-6">{t("home-text")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              className="px-5 py-3 bg-light cursor-pointer text-white rounded-lg font-semibold shadow hover:bg-[#a17459] transition"
              onClick={() => {
                navigate("/barbers");
              }}
            >
              Book Appointment
            </button>
            <button
              className="px-5 py-3 border border-light text-light cursor-pointer rounded-lg font-semibold hover:bg-mid transition"
              onClick={() => {
                navigate("/login");
              }}
            >
              Are you a Barber?
            </button>
          </div>
        </div>

        <div className="max-w-md w-full">
          <img
            src="/images/barbershop.avif"
            alt="Barber at work"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </main>
    </div>
  );
}
