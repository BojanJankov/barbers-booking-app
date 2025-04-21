import { createContext, useEffect, useState } from "react";
import { Barber } from "../Models/barber.model";
import { api } from "../services/api";

interface ContextType {
  barbers: Barber[];
  fetchBarbers: () => void;
  getBarberById: (id: number) => void;
  foundBarber: Barber | null;
}

const BarberContext = createContext<ContextType>({
  barbers: [],
  async fetchBarbers() {},
  async getBarberById(id: number) {},
  foundBarber: null,
});

export const BarberProvider = ({ children }: any) => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [foundBarber, setFoundBarber] = useState<Barber | null>(null);

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

  useEffect(() => {
    fetchBarbers();
  }, []);

  return (
    <BarberContext.Provider
      value={{ barbers, fetchBarbers, foundBarber, getBarberById }}
    >
      {children}
    </BarberContext.Provider>
  );
};

export default BarberContext;
