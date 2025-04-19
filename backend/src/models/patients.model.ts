import mongoose, { Schema, Document } from 'mongoose';
import { IPatient } from '../types/admission.types';
import { LabResultSchema, ILabResultDocument } from './labResult.model';

// Extend the IPatient interface with Mongoose's Document
export interface IPatientDocument extends IPatient, Document {
  lab_results: ILabResultDocument[]; // Add lab_results as an array of LabResult documents
}

const PatientSchema: Schema = new Schema({
  patient_id: { type: Number, required: true, unique: true },
  hospitalization_case_number: { type: Number, required: true },
  admission_date: { type: String, required: true },
  admission_time: { type: String, required: true },
  release_date: { type: String, default: null },
  release_time: { type: String, default: null },
  department: { type: String, required: true },
  room_number: { type: String, required: true },
  lab_results: { type: [LabResultSchema], default: [] }, // Correctly use LabResultSchema as an array
});

// Create the Mongoose model
export const PatientModel = mongoose.model<IPatientDocument>('Patient', PatientSchema);

export default PatientModel;