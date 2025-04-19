import * as fs from 'fs';
import * as path from 'path';
import RedisService from '../redis/redisService';

const combinedFile = path.join(__dirname, '../../data/combined.json');
async function insertPatientsToRedis() {
  try {
    // Read the combined.json file
    const patientsData = JSON.parse(fs.readFileSync(combinedFile, 'utf-8'));

    // Get Redis client from the service
    const redisClient = RedisService.getInstance();

     // Iterate over each patient and store them individually
     for (const patient of patientsData) {
      const patientId = patient.id; // Assuming each patient object has an "id" field
      if (!patientId) {
        console.error('Patient data is missing an "id" field:', patient);
        continue;
      }

      // Store the patient data as a JSON string under the key "patient:<patient-id>"
      await redisClient.set(`patient:${patientId}`, JSON.stringify(patient));
      console.log(`Inserted patient with ID ${patientId} into Redis.`);
    }

    console.log('All patients have been inserted into Redis.');

    await redisClient.disconnect();
  } catch (error) {
    console.error('Error inserting patients into Redis:', error);
  }
}

insertPatientsToRedis();
