import { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate, useParams } from "react-router-dom";
import BarberContext from "../../context/StateContext";
import { AvailableTerm } from "../../Models/terms.model";
import { api } from "../../services/api";
import { Service } from "../../Models/service.model";
import { useTranslation } from "react-i18next";

export default function BarberBookingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { barberId } = useParams();
  const { availableTerms, fetchAvailableTerms } = useContext(BarberContext);

  const [availableDates, setAvailableDates] = useState<AvailableTerm[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<
    { time: string; scheduleId: number }[]
  >([]);
  const [selectedTime, setSelectedTime] = useState<{
    time: string;
    scheduleId: number;
  } | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get<Service[]>(
          `barbers/${barberId}/services`
        );
        setServices(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (barberId) {
      fetchAvailableTerms(Number(barberId));
    }
  }, [barberId]);

  useEffect(() => {
    setAvailableDates(availableTerms);
  }, [availableTerms]);

  useEffect(() => {
    if (selectedDate) {
      const day = selectedDate.toISOString().split("T")[0];
      const found = availableDates.find((d) => d.day === day);
      setAvailableTimes(found ? found.terms : []);
      setSelectedTime(null);
    }
  }, [selectedDate, availableDates]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/appointments", {
        clientName: formData.fullName,
        clientPhone: formData.phone,
        clientEmail: formData.email,
        scheduleId: selectedTime?.scheduleId,
        barberId: Number(barberId),
        serviceId: Number(selectedService?.id),
      });

      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    if (!availableDates || availableDates.length === 0) return true;
    const day = date.toISOString().split("T")[0];
    return !availableDates.some((d) => d.day === day);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-light">
          🎉 {t("barbers-booking-confirm-message-one")}
        </h1>
        <p className="mt-2 text-font">
          {t("barbers-booking-confirm-message-two")}
        </p>
        <p
          className="mt-2 text-font hover:underline hover:text-light cursor-pointer"
          onClick={() => navigate("/barbers")}
        >
          {t("barbers-booking-confirm-link")}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-center text-font">
        {t("barbers-booking-title")}
      </h1>

      <div className="flex justify-center">
        <Calendar
          onChange={(date) => setSelectedDate(date as Date)}
          tileDisabled={tileDisabled}
          minDate={new Date()}
          className="border rounded-lg p-4 shadow-md"
        />
      </div>
      {selectedDate && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-center text-font">
            {t("barbers-booking-available-title")}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {availableTimes.length > 0 ? (
              availableTimes.map((slot) => (
                <button
                  key={slot.scheduleId}
                  onClick={() => setSelectedTime(slot)}
                  className={`px-4 py-2 rounded-full border cursor-pointer ${
                    selectedTime?.scheduleId === slot.scheduleId
                      ? "bg-mid text-font"
                      : "bg-light text-font"
                  }`}
                >
                  {slot.time}
                </button>
              ))
            ) : (
              <p className="text-gray-500">
                {t("barbers-booking-no-available-message")}
              </p>
            )}
          </div>
        </div>
      )}

      {selectedTime && (
        <>
          <div className="mt-4">
            <label
              htmlFor="service-select"
              className="block text-lg font-medium text-font mb-1"
            >
              {t("barbers-booking-service-title")}
            </label>
            <select
              id="service-select"
              value={selectedService?.id ?? ""}
              onChange={(e) => {
                const selectedId = e.target.value;
                const foundService =
                  services.find((s) => s.id === Number(selectedId)) || null;
                setSelectedService(foundService);
              }}
              className="w-full px-4 py-2 border border-border bg-mid text-font rounded-lg focus:outline-none focus:ring-2 focus:ring-font transition"
            >
              <option value="" disabled>
                {t("barbers-booking-service-select-title")}
              </option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - ${service.price}
                </option>
              ))}
            </select>
          </div>

          {selectedService && (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 max-w-md mx-auto bg-mid p-6 shadow-md rounded-lg"
            >
              <h2 className="text-xl font-semibold text-center">
                {t("barbers-booking-details-title")}
              </h2>
              <input
                type="text"
                placeholder={t("form-fullName-placeholder")}
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-border"
                required
                minLength={5}
                maxLength={35}
              />
              <input
                type="text"
                placeholder={t("form-phoneNumber-placeholder")}
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-border"
                required
                minLength={7}
                maxLength={15}
                pattern="[0-9]+"
              />
              <input
                type="email"
                placeholder={t("form-email-placeholder")}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-border"
                required
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              />
              <button
                type="submit"
                className="mt-4 bg-light border-border text-font font-semibold py-3 rounded hover:bg-dark transition cursor-pointer"
              >
                {t("barbers-booking-confirm-button")}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
