import { createContext, useEffect, useState } from "react";
import { Barber } from "../Models/barber.model";
import { api } from "../services/api";

interface ContextType {
  barbers: Barber[];
  fetchBarbers: () => void;
}

const BarberContext = createContext<ContextType>({
  barbers: [],
  fetchBarbers() {},
});

export const BarberProvider = ({ children }: any) => {
  const [barbers, setBarbers] = useState<Barber[]>([]);

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

  useEffect(() => {
    fetchBarbers();
  }, []);

  return (
    <BarberContext.Provider value={{ barbers, fetchBarbers }}>
      {children}
    </BarberContext.Provider>
  );
};

export default BarberContext;
