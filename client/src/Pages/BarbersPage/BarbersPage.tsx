import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarberContext from "../../context/StateContext";
import { Barber } from "../../Models/barber.model";
import { Mail, Phone, Briefcase, Scissors } from "lucide-react";

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
      <div className="flex justify-center px-4 py-10 bg-transparent">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8 w-full max-w-7xl">
          {filteredBarbers.map((barber) => (
            <div
              key={barber.id}
              className="bg-mid text-font rounded-2xl shadow-lg p-6 border border-border w-full max-w-[400px] mx-auto"
            >
              <div className="flex flex-col justify-center items-center space-y-5">
                <img
                  src={barber.image}
                  alt={barber.name}
                  className="w-28 h-28 rounded-full border-4 border-border object-cover"
                />
                <h2 className="text-2xl font-bold text-[#d3f8e2] text-center">
                  {barber.name}
                </h2>
                <div className="w-full space-y-2 text-sm flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-font" />
                    <span>{barber.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-font" />
                    <span>{barber.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-font" />
                    <span>Experience: {barber.experience}</span>
                  </div>
                </div>

                <div className="w-full mt-4">
                  <h3 className="text-lg font-semibold text-[#d3f8e2] mb-2 flex items-center gap-2">
                    <Scissors size={18} className="text-font" />
                    <span>Services</span>
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {barber.services.map((service, idx) => (
                      <li key={idx}>
                        {service.name} - {service.price}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className="mt-6 bg-[#2d6a4f] text-font py-2 px-6 rounded-xl hover:bg-[#1b4332] transition-all duration-200"
                  onClick={() => navigate(`/barbers/${barber.id}/booking`)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
