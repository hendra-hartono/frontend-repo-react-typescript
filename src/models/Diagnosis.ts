export default interface Diagnosis {
  id: number;
  patient: string;
  doctor: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
