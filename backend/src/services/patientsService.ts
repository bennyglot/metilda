import RedisService from "../package/dist/services/redis/redisService";
import { getSocketUrl } from "../scripts/utils";

class PatientsService {
  private redisService: RedisService;

  constructor() {
    this.redisService = RedisService.getInstance(getSocketUrl());
  }

  public async getAllPatients(): Promise<any[]> {
    try {
      const redisClient = this.redisService.getClient();
      const patientsData = await redisClient.get('patients');
      return patientsData ? JSON.parse(patientsData).patients : [];
    } catch (error) {
      console.error('Error fetching all patients from Redis:', error);
      throw error;
    }
  }

  public async getPatientById(patientId: string): Promise<any> {
    try {
      const patients = await this.getAllPatients();
      return patients.find((patient: any) => patient.patient_id === patientId) || null;
    } catch (error) {
      console.error(`Error retrieving patient with ID ${patientId} from Redis:`, error);
      throw error;
    }
  }

  public async getLabResultsByTestId(patientId: string, testId: string): Promise<any[]> {
    try {
      const patient = await this.getPatientById(patientId);
      if (patient && patient.lab_results) {
        return patient.lab_results.filter((result: any) => result.test_id === testId);
      }
      return [];
    } catch (error) {
      console.error(`Error retrieving lab results for patient ${patientId} and test ID ${testId}:`, error);
      throw error;
    }
  }
}

export default new PatientsService();
