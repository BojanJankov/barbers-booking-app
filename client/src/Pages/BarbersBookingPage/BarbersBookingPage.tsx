import { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import BarberContext from "../../context/StateContext";
import { AvailableTerm } from "../../Models/terms.model";

export default function BarberBookingPage() {
  const { barberId } = useParams();
  const { availableTerms, fetchAvailableTerms } = useContext(BarberContext);
  const [availableDates, setAvailableDates] = useState<AvailableTerm[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });
  const [success, setSuccess] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    if (barberId) {
      fetchAvailableTerms(Number(barberId));
    }

    setAvailableDates(availableTerms);
  }, [barberId]);

  useEffect(() => {
    if (selectedDate) {
      const day = selectedDate.toISOString().split("T")[0];
      const found = availableDates.find((d) => d.day === day);
      setAvailableTimes(found ? found.terms : []);
      setSelectedTime(""); // reset time when date changes
    }
  }, [selectedDate, availableDates]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/appointments", {
        barberId,
        date: selectedDate,
        time: selectedTime,
        fullName: formData.fullName,
        phoneNumber: formData.phone,
        email: formData.email,
      });
      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong, try again.");
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
        <h1 className="text-2xl font-bold text-light">🎉 Booking Confirmed!</h1>
        <p className="mt-2 text-gray-700">We sent you a confirmation email.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-8 h-100vh">
      <h1 className="text-3xl font-bold text-center text-font">
        Book Your Appointment
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
            Available Times
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {availableTimes.length > 0 ? (
              availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-2 rounded-full border cursor-pointer ${
                    selectedTime === time
                      ? "bg-mid text-font"
                      : "bg-font text-mid"
                  }`}
                >
                  {time}
                </button>
              ))
            ) : (
              <p className="text-gray-500">No available times for this day.</p>
            )}
          </div>
        </div>
      )}
      {/* {selectedTime && (
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="input"
        >
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      )} */}
      {selectedTime && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-md mx-auto bg-font p-6 shadow-md rounded-lg"
        >
          <h2 className="text-xl font-semibold text-center">Your Details</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-border"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-border"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-border"
            required
          />

          <button
            type="submit"
            className="mt-4 bg-mid border-border text-font font-semibold py-3 rounded hover:bg-light transition cursor-pointer"
          >
            Confirm Booking
          </button>
        </form>
      )}
    </div>
  );
}
