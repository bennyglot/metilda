import { Request, Response } from 'express';
import {getAllPatients, getPatientById, getLabResultsByTestId} from '../services/patientsService';

// Get all patients
export const getPatients = async (req: Request, res: Response) => {
  try {
    const patientsResult = await getAllPatients();
    res.status(200).json({ patients: patientsResult });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
};

// Get patient by ID
export const getPatientByIdController = async (req: Request, res: Response) => {
  const { patientId } = req.params;

  try {
    const patientResult = await getPatientById(patientId);
    if (patientResult) {
      res.status(200).json({ patient: patientResult });
    } else {
      res.status(404).json({ error: 'Patient not found' });
    }
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Failed to fetch patient' });
  }
};

export const getPatientLabResultsByTestId = async (req: Request, res: Response) => {
  const { patientId, testId } = req.params;

  try {
    const labResults = await getLabResultsByTestId(patientId, testId);
    if (labResults.length > 0) {
      res.status(200).json({ labResults });
    } else {
      res.status(404).json({ error: 'No lab results found for this test ID' });
    }
  } catch (error) {
    console.error('Error fetching lab results:', error);
    res.status(500).json({ error: 'Failed to fetch lab results' });
  }
}

