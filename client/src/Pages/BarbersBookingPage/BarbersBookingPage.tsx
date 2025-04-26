import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";

export default function BarberBookingPage() {
  const { barberId } = useParams<{ barberId: string }>();
  const numericBarberId = Number(barberId);
  const [availableDates, setAvailableDates] = useState<
    { date: string; times: string[] }[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!numericBarberId) return;
    api
      .get(`barbers/${numericBarberId}/available`)
      .then((res) => setAvailableDates(res.data))
      .catch((err) => console.error(err));
  }, [numericBarberId]);

  useEffect(() => {
    if (selectedDate) {
      const day = selectedDate.toISOString().split("T")[0];
      const found = availableDates.find((d) => d.date === day);
      setAvailableTimes(found ? found.times : []);
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
    return !availableDates.some((d) => d.date === day);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-green-600">
          🎉 Booking Confirmed!
        </h1>
        <p className="mt-2 text-gray-700">We sent you a confirmation email.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-center">Book Your Appointment</h1>

      {/* Calendar */}
      <div className="flex justify-center">
        <Calendar
          onChange={(date) => setSelectedDate(date as Date)}
          tileDisabled={tileDisabled}
          minDate={new Date()}
          className="border rounded-lg p-4 shadow-md"
        />
      </div>

      {/* Available Times */}
      {selectedDate && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-center">Available Times</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {availableTimes.length > 0 ? (
              availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedTime === time
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
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

      {/* Booking Form */}
      {selectedTime && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-md mx-auto bg-white p-6 shadow-md rounded-lg"
        >
          <h2 className="text-xl font-semibold text-center">Your Details</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="mt-4 bg-green-500 text-white font-semibold py-3 rounded hover:bg-green-600 transition"
          >
            Confirm Booking
          </button>
        </form>
      )}
    </div>
  );
}
