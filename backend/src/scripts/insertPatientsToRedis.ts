import * as fs from 'fs';
import * as path from 'path';
import RedisService from '../package/dist/services/redis/redisService';
import { getSocketUrl } from './utils';

const combinedFile = path.join(__dirname, '../../data/combined.json');
async function insertPatientsToRedis() {
  try {
    // Read the combined.json file
    const patientsData = JSON.parse(fs.readFileSync(combinedFile, 'utf-8'));

    // Get Redis client from the service
    const redisService = RedisService.getInstance(getSocketUrl());
    await redisService.connect();
    const redisClient = redisService.getClient();

    // Store all patients under a single key "patients"
    await redisClient.set('patients', JSON.stringify({ patients: patientsData }));
    console.log('All patients have been inserted into Redis under the key "patients".');

    await redisService.disconnect();
  } catch (error) {
    console.error('Error inserting patients into Redis:', error);
  }
}

insertPatientsToRedis();
