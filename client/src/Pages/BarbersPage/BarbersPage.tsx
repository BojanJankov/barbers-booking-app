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
  }, [barbers]);

  const filteredBarbers = displayBarbers.filter((barber) =>
    barber.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddBarber = () => {
    navigate("/add-barber");
  };

  return (
    <div className="p-25 max-w-5xl mx-auto bg-[#344e41] min-h-screen">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search barbers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md text-lg px-4 py-2 rounded-md border border-[#a3b18a] bg-[#3a5a40] text-[#dad7cd] placeholder-[#dad7cd]"
        />
      </div>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddBarber}
          className="flex items-center gap-2 bg-[#588157] text-[#dad7cd] px-4 py-2 rounded-lg hover:bg-[#3a5a40] transition cursor-pointer"
        >
          Add Barber
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto max-h-[70vh] pb-4">
        {filteredBarbers.map((barber) => (
          <div key={barber.id}>
            <div className="rounded-2xl shadow-md hover:shadow-xl transition border border-[#a3b18a] bg-[#3a5a40] text-[#dad7cd]">
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold">{barber.name}</h2>
                <p className="text-sm">Email: {barber.email}</p>
                <p className="text-sm">Phone Number: {barber.phoneNumber}</p>
                <p className="text-sm">Experience: {barber.experience} years</p>
                <button className="w-full mt-2 bg-[#588157] hover:bg-[#344e41] text-[#dad7cd] px-4 py-2 rounded-md transition cursor-pointer">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
