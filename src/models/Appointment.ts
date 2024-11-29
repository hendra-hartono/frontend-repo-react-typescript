export default interface Appointment {
  id: number;
  patient: { name: string };
  doctor: string;
  date: string;
  time: string;
  roomNumber: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
