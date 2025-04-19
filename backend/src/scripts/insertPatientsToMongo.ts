import * as fs from 'fs';
import * as path from 'path';
import mongoose from 'mongoose';
import PatientModel from '../models/patients.model';
import { IPatient } from '../types';

const combinedFile = path.join(__dirname, '../../data/combined.json');

async function insertPatientsToMongo() {
  try {
    // Connect to MongoDB with authenticat  ion
    console.log(`in insert patient to mongo`);
    const result1 = await mongoose.connect('mongodb://appUser:123456@127.0.0.1:27017/echilov');   
     console.log(`result: ${result1}`);
    console.log('[MongoDB] Connected to the database.');

    // Read the combined.json file
    const patientsData: IPatient[] = JSON.parse(fs.readFileSync(combinedFile, 'utf-8'));

    // Perform bulk insertion
    const bulkOps = patientsData.map((patient) => {
      console.log('Updating patient:', patient);
      return {
        updateOne: {
          filter: { patient_id: patient.patient_id }, // Check if the patient already exists
          update: patient, // Update the patient data
          upsert: true, // Insert if it doesn't exist
        },
      };
    });

    // Execute the bulk operation
    const result = await PatientModel.bulkWrite(bulkOps);
    console.log('Bulk insertion completed:', result);

    console.log('All patients have been inserted or updated in MongoDB.');
  } catch (error) {
    console.error('Error inserting patients into MongoDB:', error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('[MongoDB] Disconnected from the database.');
  }
}

insertPatientsToMongo();