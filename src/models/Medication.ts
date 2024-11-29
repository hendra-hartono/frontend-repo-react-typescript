export default interface Medication {
  id: number;
  patient: string;
  name: string;
  dosage: string;
  frequency: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
