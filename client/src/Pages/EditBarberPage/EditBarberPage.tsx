import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BarberContext from "../../context/StateContext";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const EditBarberPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { getBarberById, foundBarber } = useContext(BarberContext);

  useEffect(() => {
    getBarberById(Number(id));
  }, []);

  const handleEditBarber = () => {
    // Da se dodaj ovde navigacija do forma za editiranje na barber i zacuvuvanje na istoto
  };

  const handleAddSchedule = (day: string) => {
    // Da se dodaj ovde navigacija do forma za dodavanje na schedule na barber i zacuvuvanje na istoto
  };

  return (
    <div className="min-h-screen bg-dark text-font p-6 space-y-10">
      <section className="bg-mid rounded-2xl p-6 shadow-lg border border-border space-y-4">
        <h2 className="text-2xl font-semibold">Barber Info</h2>
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-border shadow-md">
          <img
            src={foundBarber?.image}
            alt={foundBarber?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-3 text-lg sm:text-xl text-center mb-10">
          <p>
            <span className="font-semibold text-light text-xl sm:text-2xl">
              Name:
            </span>{" "}
            {foundBarber?.name}
          </p>
          <p>
            <span className="font-semibold text-light text-xl sm:text-2xl">
              Email:
            </span>{" "}
            {foundBarber?.email}
          </p>
          <p>
            <span className="font-semibold text-light text-xl sm:text-2xl">
              Experience:
            </span>{" "}
            {foundBarber?.experience}
          </p>
          <p>
            <span className="font-semibold text-light text-xl sm:text-2xl">
              Phone number:
            </span>{" "}
            {foundBarber?.phoneNumber}
          </p>
        </div>
        <div className="text-center">
          <button
            onClick={handleEditBarber}
            className="px-6 py-2 rounded-lg bg-light hover:bg-border text-font transition-all shadow-md cursor-pointer"
          >
            Edit barber info
          </button>
        </div>
      </section>
      <section className="bg-mid rounded-2xl p-6 shadow-lg border border-border">
        <h2 className="text-2xl font-semibold mb-4">Weekly Schedule</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              onClick={() => handleAddSchedule(day)}
              className="cursor-pointer bg-light hover:bg-border transition-all p-4 rounded-2xl flex items-center justify-between text-white shadow-md"
            >
              <span className="text-lg font-medium">{day}</span>
              <i className="fa-solid fa-plus"></i>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EditBarberPage;
