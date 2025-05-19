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
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    setDisplayBarbers(barbers);
  }, [barbers, setDisplayBarbers]);

  const filteredBarbers = displayBarbers.filter((barber) =>
    barber.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-25 max-w-5xl mx-auto bg-dark min-h-screen">
      {/* Filter menu and search bar down here */}
      <div className="flex flex-col items-center mb-10 space-y-4">
        <input
          type="text"
          placeholder="Search barbers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md text-lg px-4 py-2 rounded-md border border-border bg-mid text-font placeholder-font"
        />
        <div className="flex flex-wrap justify-center gap-4">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none text-font bg-mid border border-border px-4 py-2 rounded-md text-lg cursor-pointer"
            >
              <option value="">Filter by</option>
              <option value="location">Location</option>
              <option value="jobType">Services</option>
            </select>
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none text-font bg-mid border border-border px-4 py-2 rounded-md text-lg cursor-pointer"
            >
              <option value="">Sort by</option>
              <option value="newest">Newest</option>
              <option value="relevance">Relevance</option>
              <option value="salaryHigh">Salary: High to Low</option>
              <option value="salaryLow">Salary: Low to High</option>
            </select>
          </div>
        </div>
      </div>
      {/* Barbers cards down here */}
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
                <h2 className="text-2xl font-bold text-font text-center">
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
                  <h3 className="text-lg font-semibold text-font mb-2 flex items-center gap-2">
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

                {/* <div className="w-full mt-4 text-center">
                  <div className="flex justify-center items-center gap-1 text-yellow-400 text-lg">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <svg
                        key={idx}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={idx < barber.rating ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-font">
                      ({barber.rating.toFixed(1)})
                    </span>
                  </div>
                  <button
                    onClick={() => handleRating(barber.id)}
                    className="mt-3 text-sm text-[#90e0ef] hover:underline"
                  >
                    Leave a Rating
                  </button>
                </div> */}

                <button
                  className="mt-6 bg-dark text-font py-2 px-6 rounded-xl hover:bg-light transition-all duration-200 cursor-pointer"
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
