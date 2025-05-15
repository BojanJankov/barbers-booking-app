import { useState, useEffect } from "react";
import { Appointment } from "../../Models/appointment.model";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";

export default function BarberAppointmentsPage() {
  const { id } = useParams();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get(`/barbers/${id}/appointments`);

        console.log(response);
        const today = new Date();
        const filtered = response.data.filter((appt: Appointment) => {
          return new Date(appt.schedule.day) >= today;
        });
        setAppointments(filtered);
      } catch (error) {
        console.error("Failed to get appointments:", error);
      }
    };

    fetchAppointments();
    console.log(appointments);
  }, [id]);

  return (
    <div className="min-h-screen bg-dark text-font p-6">
      <h1 className="text-3xl font-semibold border-b border-border pb-2 mb-6">
        Upcoming Appointments
      </h1>
      <div className="space-y-4">
        {appointments.length > 0 ? (
          appointments.map((appt) => (
            <div
              key={appt.id}
              className="p-4 rounded-xl bg-mid] border border-border shadow-md"
            >
              <div className="text-lg font-medium">{appt.clientName}</div>
              <div className="text-sm text-font/80">
                📅 {new Date(appt.schedule.day).toLocaleDateString()} — ⏰{" "}
                {appt.schedule.time}
              </div>
              <div className="text-sm">📞 {appt.clientPhone}</div>
              <div className="text-sm">✂ {appt.service.name}</div>
            </div>
          ))
        ) : (
          <p className="text-font/70">No upcoming appointments.</p>
        )}
      </div>
    </div>
  );
}
