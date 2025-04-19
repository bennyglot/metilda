export interface ILabResult {
    result_id: number;
    test_id: number;
    result_value: number;
    result_unit: string;
    reference_range: string | null;
    result_status: string;
    performed_date: string;
    performed_time: string;
    reviewing_physician: string | null;
    patient_id: number;
  }