import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { IPatient, ILabResult } from '../package/dist';

interface Patient extends IPatient {
  lab_results: ILabResult[];
}

const admissionsFile = path.join(__dirname, '../../data/admissions.csv');
const labResultsFile = path.join(__dirname, '../../data/lab_results_updated.csv');
const outputFile = path.join(__dirname, '../../data/combined.json');

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

async function buildPatients() {
  try {
    const admissions: IPatient[] = await parseCSV<IPatient>(admissionsFile);
    const labResults: ILabResult[] = await parseCSV<ILabResult>(labResultsFile);

    const patients: Patient[] = admissions.map((admission) => {
      const patientLabResults = labResults.filter(
        (labResult) => labResult.patient_id === admission.patient_id
      );

      console.log(`patientLabResults for ${admission.patient_id}:`, patientLabResults);
      return {
        ...admission,
        lab_results: patientLabResults,
      };
    });

    fs.writeFileSync(outputFile, JSON.stringify(patients, null, 2));
    console.log(`Combined data written to ${outputFile}`);
  } catch (error) {
    console.error('Error building patients:', error);
  }
}

buildPatients();
