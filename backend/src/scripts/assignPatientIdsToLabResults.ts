import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { parse } from 'json2csv';

interface Admission {
  patient_id: number;
  // ...existing columns...
}

interface LabResult {
  result_id: number;
  test_id: number;
  result_value: number;
  result_unit: string;
  reference_range: string | null;
  result_status: string;
  performed_date: string;
  performed_time: string;
  reviewing_physician: string | null;
}

const admissionsFile = path.join(__dirname, '../../data/admissions.csv');
const labResultsFile = path.join(__dirname, '../../data/lab_results.csv');
const updatedLabResultsFile = path.join(__dirname, '../../data/lab_results_updated.csv');

async function parseCSV<T>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

async function assignPatientIdsToLabResults() {
  try {
    const admissions: Admission[] = await parseCSV<Admission>(admissionsFile);
    const labResults: LabResult[] = await parseCSV<LabResult>(labResultsFile);

    // Map to track how many lab results each patient has
    const patientLabCount: Record<number, number> = {};
    admissions.forEach((admission) => {
      patientLabCount[admission.patient_id] = 0;
    });

    // Shuffle admissions to randomize assignment
    const shuffledAdmissions = admissions.sort(() => Math.random() - 0.5);

    // Assign patient_id to lab results
    const updatedLabResults = labResults.map((labResult) => {
      for (const admission of shuffledAdmissions) {
        if (patientLabCount[admission.patient_id] < 7) {
          patientLabCount[admission.patient_id]++;
          return { patient_id: admission.patient_id, ...labResult }; // Place patient_id at the start
        }
      }
      throw new Error('Not enough patients to assign to all lab results.');
    });

    // Ensure every patient has at least 1 lab result
    for (const patientId in patientLabCount) {
      if (patientLabCount[patientId] === 0) {
        const unassignedLabResult = updatedLabResults.find((result) => !result.patient_id);
        if (unassignedLabResult) {
          unassignedLabResult.patient_id = Number(patientId);
          patientLabCount[patientId]++;
        }
      }
    }

    // Write updated lab results to a new CSV file
    const csvData = parse(updatedLabResults);
    fs.writeFileSync(updatedLabResultsFile, csvData);
    console.log(`Updated lab results written to ${updatedLabResultsFile}`);
  } catch (error) {
    console.error('Error assigning patient IDs to lab results:', error);
  }
}

assignPatientIdsToLabResults();
