import { createContext, useEffect, useState } from "react";
import { Barber } from "../Models/barber.model";
import { api } from "../services/api";
import { AvailableTerm } from "../Models/terms.model";

interface ContextType {
  barbers: Barber[];
  fetchBarbers: () => void;
  getBarberById: (id: number) => void;
  foundBarber: Barber | null;
  availableTerms: AvailableTerm[];
  fetchAvailableTerms: (barberId: number) => Promise<void>;
}

const BarberContext = createContext<ContextType>({
  barbers: [],
  async fetchBarbers() {},
  async getBarberById(id: number) {},
  foundBarber: null,
  availableTerms: [],
  async fetchAvailableTerms(barberId: number) {},
});

export const BarberProvider = ({ children }: any) => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [foundBarber, setFoundBarber] = useState<Barber | null>(null);
  const [availableTerms, setAvailableTerms] = useState<AvailableTerm[]>([]);

  const fetchBarbers = async () => {
    try {
      const { data, statusText } = await api.get("barbers");
      const barbers = data as Barber[];

      setBarbers(barbers);
      console.log("Uspesno povikana fetch funkcija", statusText);
    } catch (error) {
      console.log(error);
    }
  };

  const getBarberById = async (id: number) => {
    try {
      const { data, statusText } = await api.get(`barbers/${id}`);
      const barber = data as Barber;

      setFoundBarber(barber);
      console.log("Uspesno povikana get barberById funkcija", statusText);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAvailableTerms = async (barberId: number) => {
    try {
      const { data } = await api.get<AvailableTerm[]>(
        `barbers/${barberId}/available`
      );

      console.log("Dobijani datumi:", data);
      setAvailableTerms(data);
      console.log(availableTerms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  return (
    <BarberContext.Provider
      value={{
        barbers,
        fetchBarbers,
        foundBarber,
        getBarberById,
        fetchAvailableTerms,
        availableTerms,
      }}
    >
      {children}
    </BarberContext.Provider>
  );
};

export default BarberContext;
