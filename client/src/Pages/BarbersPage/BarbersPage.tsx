import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarberContext from "../../context/StateContext";
import { Barber } from "../../Models/barber.model";
import { Mail, Phone, Briefcase, Scissors, MapPin, User } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function BarbersPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { barbers } = useContext(BarberContext);
  const [displayBarbers, setDisplayBarbers] = useState<Barber[]>(barbers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    let updated = [...barbers];

    if (search.trim()) {
      if (filter) {
        updated = updated.filter((barber) => {
          const value = barber[filter as keyof Barber];
          return value?.toString().toLowerCase().includes(search.toLowerCase());
        });
      } else {
        updated = updated.filter((barber) =>
          barber.name.toLowerCase().includes(search.toLowerCase())
        );
      }
    }

    if (sort) {
      updated.sort((a, b) => {
        if (sort === "newest") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        if (sort === "experience") {
          return b.experience - a.experience;
        }
        if (sort === "services") {
          return b.services.length - a.services.length;
        }
        return 0;
      });
    }

    setDisplayBarbers(updated);
  }, [barbers, search, filter, sort]);

  const handleReset = () => {
    setSearch("");
    setSort("");
    setFilter("");
    setDisplayBarbers(barbers);
  };

  return (
    <div className="min-h-screen bg-dark px-6 py-10">
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder={t("barbers-search-placeholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-border bg-mid text-font placeholder:text-[#888] shadow-sm focus:outline-none focus:border-light"
          />
          <div className="flex gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-mid text-font border border-border shadow-sm cursor-pointer"
            >
              <option value="">{t("barbers-filter-deafult")}</option>
              <option value="name">{t("barbers-filter-name")}</option>
              <option value="city">{t("barbers-filter-city")}</option>
              <option value="address">{t("barbers-filter-address")}</option>
              <option value="experience">
                {t("barbers-filter-experience")}
              </option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 rounded-xl bg-mid text-font border border-border shadow-sm cursor-pointer"
            >
              <option value="">{t("barbers-sort-deafult")}</option>
              <option value="newest">{t("barbers-sort-newest")}</option>
              <option value="experience">{t("barbers-sort-experience")}</option>
              <option value="services">{t("barbers-sort-services")}</option>
            </select>
            <button
              className="px-4 py-3 rounded-xl bg-mid text-font border border-border shadow-sm transition cursor-pointer hover:bg-light hover:shadow-md"
              onClick={handleReset}
            >
              {t("barbers-reset-button")}
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        {displayBarbers.length > 0 ? (
          <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {displayBarbers.map((barber) => (
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
                  {barber.bussinesName}
                </h2>
                <div className="space-y-1 text-sm text-center">
                  <div className="flex items-center justify-center gap-2">
                    <User size={17} /> <span>{barber.name}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Mail size={17} /> <span>{barber.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Phone size={17} /> <span>{barber.phoneNumber}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <MapPin size={17} />{" "}
                    <span>
                      {barber.address} - {barber.city}{" "}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Briefcase size={17} />{" "}
                    <span>
                      {" "}
                      {t("barbers-card-experience-title")} {barber.experience}
                    </span>
                  </div>
                </div>
                <div className="w-full mt-4">
                  <h4 className="font-bold">About me</h4>
                  <p>{barber.description}</p>
                </div>
                <div className="w-full mt-4">
                  <h3 className="text-md font-bold mb-1 flex items-center gap-2">
                    <Scissors size={18} /> Services
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {barber.services.map((service, idx) => (
                      <li key={idx}>
                        {service.name} - {service.price}$
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => navigate(`/barbers/${barber.id}/booking`)}
                  className="mt-6 bg-dark hover:bg-light text-font px-6 py-2 rounded-xl transition cursor-pointer"
                >
                  {t("barbers-card-button-text")}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-font text-lg mt-20">
            {t("barbers-not-found-message")}
          </div>
        )}
      </div>
    </div>
  );
}
