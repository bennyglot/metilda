import mongoose, { Schema, Document } from 'mongoose';
import { ILabResult } from '../types';

export interface ILabResultDocument extends ILabResult, Document {}

// Define the LabResult schema
export const LabResultSchema: Schema = new Schema({
  result_id: { type: Number, required: true, unique: true },
  test_id: { type: Number, required: true },
  result_value: { type: Number, required: true },
  result_unit: { type: String, required: true },
  reference_range: { type: String, default: null },
  result_status: { type: String, required: true },
  performed_date: { type: String, required: true },
  performed_time: { type: String, required: true },
  reviewing_physician: { type: String, default: null },
  patient_id: { type: Number, required: true },
});

// Create the Mongoose model
export const LabResultModel = mongoose.model<ILabResultDocument>('LabResult', LabResultSchema);

export default LabResultModel;

