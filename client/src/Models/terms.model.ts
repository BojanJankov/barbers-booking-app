export interface AvailableTerm {
  day: string;
  terms: {
    time: string;
    scheduleId: number;
  }[];
}
