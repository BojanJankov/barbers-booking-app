import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BarberContext from "../../context/StateContext";
import CalendarWithTerms from "../../Components/CalendarWithTerms/CalendarWithTerms";
import { Service } from "../../Models/service.model";
import { api } from "../../services/api";

const EditBarberPage = () => {
  const { id } = useParams();
  const { getBarberById, foundBarber } = useContext(BarberContext);
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    getBarberById(Number(id));
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await api.get<Service[]>("services");

      setServices(response.data);
    };

    fetchServices();
  }, []);

  const handleEditBarber = () => {
    // Da se dodaj ovde navigacija do forma za editiranje na barber i zacuvuvanje na istoto
  };

  const handleAddService = () => {
    navigate("add-service/:id");
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

      <div className="border p-6 rounded-lg bg-mid">
        <h2 className="text-2xl font-bold mb-4 text-font">
          Manage Available Terms
        </h2>
        {foundBarber && foundBarber.id && (
          <CalendarWithTerms barberId={foundBarber.id} />
        )}
      </div>
      <div className="border p-6 rounded-lg bg-mid">
        <h2 className="text-2xl font-bold mb-4 text-font">Manage Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-border text-font p-4 rounded-xl shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-lg">{service.name}</h3>
              <p className="text-sm">{service.price}</p>
            </div>
          ))}
          <button
            onClick={handleAddService}
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border text-font rounded-xl hover:bg-light transition-all cursor-pointer"
          >
            <span className="text-4xl font-bold">+</span>
            <span className="mt-2 text-sm">Add Service</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBarberPage;
