export interface IPatient {
  patient_id: number;
  hospitalization_case_number: number;
  admission_date: string;
  admission_time: string;
  release_date: string | null;
  release_time: string | null;
  department: string;
  room_number: string;
}