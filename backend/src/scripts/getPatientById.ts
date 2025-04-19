import RedisService from '../redis/redisService';
import {getPatientById as getPatientByIdFromService} from '../services/patientsService';

async function getPatientById(patientId: string) {
  console.log(`Fetching patient with ID: ${patientId}`);
  try {
    const redisService = RedisService.getInstance();

    const patient = await getPatientByIdFromService(patientId);
    if (patient) {
      console.log(`Patient data for ID ${patientId}:`, patient);
    } else {
      console.log(`No patient found with ID ${patientId}`);
    }

    await redisService.disconnect();
  } catch (error) {
    console.error('Error fetching patient by ID:', error);
  }
}

const patientId = process.argv[2]; // Get patient ID from command-line arguments
if (!patientId) {
  console.error('Please provide a patient ID as an argument.');
  process.exit(1);
}

getPatientById(patientId);
