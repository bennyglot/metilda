import express from 'express';
import {
  getPatients,
  getPatientByIdController,
  getPatientLabResultsByTestId

 
} from '../controllers/patientsController';

const router = express.Router();

// Route to get optional list of patient IDs
router.get('/', getPatients);
router.get('/:patientId', getPatientByIdController);
router.get('/:patientId/:testId', getPatientLabResultsByTestId)

export default router;