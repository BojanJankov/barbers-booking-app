type Term = { time: string; scheduleId: number };

export interface AvailableTerm {
  day: string;
  terms: Term[];
}
