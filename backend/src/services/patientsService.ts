import { getDb } from "../config/db";
import { IPatient } from "../types";

// Fetch all patients
export const getAllPatients = async (): Promise<IPatient[]> => {
  try {
    console.log("[MongoDB] Fetching all patients from database...");
    const db = await getDb();
    const patients = await db.collection('patients').find({}).toArray();
    
    return patients as unknown as Promise<IPatient[]>;

  } catch (error) {
    console.error("Error fetching all patients from MongoDB:", error);
    throw error;
  }
};

// Fetch a single patient by ID
export const getPatientById = async (patientId: string): Promise<IPatient | null> => {
  try {
    console.log("[MongoDB] Fetching patientId...");
    const db = await getDb();
    const patient = await db.collection('patients').findOne({ patient_id: patientId });
    return patient as unknown as IPatient;
  } catch (error) {
    console.error("Error fetching all patients from MongoDB:", error);
    throw error;
  }
};

// Fetch lab results by test ID for a specific patient
export const getLabResultsByTestId = async (patientId: string, testId: string): Promise<any[]> => {
  try {
    console.log(`[MongoDB] Fetching lab results for patient ${patientId} and test ID ${testId}...`);
    const db = await getDb();
    
    const results = await db.collection('patients')
      .aggregate([
        { $match: { patient_id: patientId } },
        { $unwind: "$lab_results" },
        { $match: { "lab_results.test_id": testId } },
        { $replaceRoot: { newRoot: "$lab_results" } }
      ])
      .toArray();
      
    return results;
  } catch (error) {
    console.error(`Error retrieving lab results for patient ${patientId} and test ID ${testId}:`, error);
    throw error;
  }
};
