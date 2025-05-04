import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { AvailableTerm } from "../../Models/terms.model";
import BarberContext from "../../context/StateContext";

type Props = {
  barberId: string | undefined;
};

export default function CalendarWithTerms({ barberId }: Props) {
  const { fetchAvailableTerms, availableTerms } = useContext(BarberContext);
  const [displayAvailableTerms, setDisplayAvailableTerms] = useState<
    AvailableTerm[]
  >([]);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [newTime, setNewTime] = useState<string>("");

  useEffect(() => {
    if (barberId) {
      fetchAvailableTerms(Number(barberId));
    }
  }, [barberId]);

  useEffect(() => {
    setDisplayAvailableTerms(availableTerms);
  }, [availableTerms]);

  const timesForSelectedDay =
    displayAvailableTerms.find((d) => d.day === selectedDay)?.terms || [];

  const addTimeToDay = () => {
    if (!selectedDay || !newTime) return;

    setDisplayAvailableTerms((prev) => {
      const existing = prev.find((d) => d.day === selectedDay);
      if (existing) {
        return prev.map((d) =>
          d.day === selectedDay
            ? { ...d, terms: [...new Set([...d.terms, newTime])].sort() }
            : d
        );
      } else {
        return [...prev, { day: selectedDay, terms: [newTime] }];
      }
    });

    setNewTime("");
  };

  const removeTimeFromDay = (time: string) => {
    setDisplayAvailableTerms((prev) =>
      prev
        .map((d) =>
          d.day === selectedDay
            ? { ...d, terms: d.terms.filter((t) => t !== time) }
            : d
        )
        .filter((d) => d.terms.length > 0)
    );
  };

  const handleSave = async () => {
    try {
      console.log("Data to send:", { availableTerms: displayAvailableTerms });
      await api.patch(`barbers/${barberId}/available`, {
        availableTerms: displayAvailableTerms,
      });
      console.log("Terms saved!");
    } catch (err) {
      console.error(err);
      console.log("Failed to save terms");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 7 }).map((_, idx) => {
          const today = new Date();
          const date = new Date(today);
          date.setDate(today.getDate() + idx);

          const dayStr = date.toISOString().split("T")[0];
          const hasTerms = displayAvailableTerms.some((d) => d.day === dayStr);

          return (
            <button
              key={dayStr}
              className={`p-2 rounded border ${
                selectedDay === dayStr
                  ? "bg-light text-font cursor-pointer"
                  : hasTerms
                  ? "bg-green-300 text-dark cursor-pointer"
                  : "bg-dark cursor-pointer"
              }`}
              onClick={() => setSelectedDay(dayStr)}
            >
              {date.toDateString()}
            </button>
          );
        })}
      </div>
      {selectedDay && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Terms for {selectedDay}</h3>

          <div className="flex gap-2">
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              onClick={addTimeToDay}
              className="bg-mid border-border text-font p-2 rounded"
            >
              Add Term
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {timesForSelectedDay.map((time) => (
              <div key={time} className="flex items-center gap-1">
                <span className="bg-dark text-font border-border px-4 py-2 rounded">
                  {time}
                </span>
                <button
                  onClick={() => removeTimeFromDay(time)}
                  className="text-red-500"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleSave}
            className="bg-light border-border hover:bg-dark text-font p-2 rounded cursor-pointer"
          >
            Save Terms
          </button>
        </div>
      )}
    </div>
  );
}
