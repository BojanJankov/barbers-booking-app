import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarberContext from "../../context/StateContext";
import { Barber } from "../../Models/barber.model";

export default function BarbersPage() {
  const navigate = useNavigate();
  const { barbers } = useContext(BarberContext);
  const [displayBarbers, setDisplayBarbers] = useState<Barber[]>(barbers);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setDisplayBarbers(barbers);
  }, [barbers, setDisplayBarbers]);

  const filteredBarbers = displayBarbers.filter((barber) =>
    barber.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-25 max-w-5xl mx-auto bg-[#344e41] min-h-screen">
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search barbers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md text-lg px-4 py-2 rounded-md border border-[#a3b18a] bg-[#3a5a40] text-[#dad7cd] placeholder-[#dad7cd]"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto max-h-[70vh] p-10 bg-transaprent rounded-2xl">
        {filteredBarbers.map((barber) => (
          <div
            key={barber.id}
            className="max-w-xs mx-auto rounded-2xl cursor-pointer bg-[#345342] text-[#d1e8c0] shadow-md hover:shadow-xl transition border border-[#b2d8a6] overflow-hidden p-4 space-y-4"
          >
            <img
              src={barber.image}
              alt={barber.name}
              className="w-24 h-24 rounded-full mx-auto border-4 border-[#b2d8a6] object-cover"
            />
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold">{barber.name}</h2>
              <div className="text-sm">
                <p>
                  <span className="font-medium text-[#c7f9cc]">Email:</span>{" "}
                  {barber.email}
                </p>
                <p>
                  <span className="font-medium text-[#c7f9cc]">
                    Phone Number:
                  </span>{" "}
                  {barber.phoneNumber}
                </p>
                <p>
                  <span className="font-medium text-[#c7f9cc]">
                    Experience:
                  </span>{" "}
                  {barber.experience} years
                </p>
              </div>
            </div>
            <div className="text-center">
              <button
                className="bg-[#5c8668] hover:bg-[#6f9f7b] transition text-white px-6 py-2 rounded-xl font-medium shadow-md cursor-pointer"
                onClick={() => {
                  navigate(`/barbers/${barber.id}/booking`);
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
