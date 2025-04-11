import RedisService from '../package/dist/services/redis/redisService';
import PatientsService from '../services/patientsService';
import { getSocketUrl } from './utils';

async function getPatientById(patientId: string) {
  console.log(`Fetching patient with ID: ${patientId}`);
  try {
    const redisService = RedisService.getInstance(getSocketUrl());
    await redisService.connect();

    const patient = await PatientsService.getPatientById(patientId);
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
