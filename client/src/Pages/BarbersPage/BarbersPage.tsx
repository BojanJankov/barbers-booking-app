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
    <div className="min-h-screen bg-dark px-6 py-10">
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search barbers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-border bg-mid text-font placeholder:text-[#888] shadow-sm focus:outline-none focus:border-light"
          />

          <div className="flex gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 rounded-xl bg-mid text-font border border-border shadow-sm cursor-pointer"
            >
              <option value="">Filter by</option>
              <option value="location">Location</option>
              <option value="jobType">Services</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-3 rounded-xl bg-mid text-font border border-border shadow-sm cursor-pointer"
            >
              <option value="">Sort by</option>
              <option value="newest">Newest</option>
              <option value="relevance">Relevance</option>
              <option value="salaryHigh">Salary: High to Low</option>
              <option value="salaryLow">Salary: Low to High</option>
            </select>
            <button className="px-4 py-3 rounded-xl bg-mid text-font border border-border shadow-sm transition cursor-pointer hover:bg-light hover:shadow-md">
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBarbers.map((barber) => (
          <div
            key={barber.id}
            className="bg-border text-font rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center"
          >
            <img
              src={barber.image}
              alt={barber.name}
              className="w-24 h-24 rounded-full border-4 border-[#BFAEA2] object-cover mb-4"
            />
            <h2 className="text-xl font-semibold text-center mb-2">
              {barber.name}
            </h2>
            <div className="space-y-1 text-sm text-center">
              <div className="flex items-center justify-center gap-2">
                <Mail size={16} /> <span>{barber.email}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone size={16} /> <span>{barber.phoneNumber}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Briefcase size={16} />{" "}
                <span>Experience: {barber.experience}</span>
              </div>
            </div>

            <div className="w-full mt-4">
              <h3 className="text-lg font-medium mb-1 flex items-center gap-2">
                <Scissors size={18} /> Services
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
              onClick={() => navigate(`/barbers/${barber.id}/booking`)}
              className="mt-6 bg-dark hover:bg-light text-font px-6 py-2 rounded-xl transition cursor-pointer"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
