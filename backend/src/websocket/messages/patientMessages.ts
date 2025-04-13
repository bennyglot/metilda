import { WebSocket } from 'ws';
import PatientsService from '../../services/patientsService';
import { WSMessagesTopic, WSMessagesPatientActions } from '../../package/dist';

const handlePatientMessages = async (ws: WebSocket, action: string, data: any) => {
  try {
    switch (action) {
      case `${WSMessagesTopic.PATIENT}:${WSMessagesPatientActions.GET_ALL}`:
        const allPatients = await PatientsService.getAllPatients();
        ws.send(JSON.stringify({ action: `${WSMessagesTopic.PATIENT}: ${WSMessagesPatientActions.GET_ALL}`, data: allPatients }));
        break;

      case `${WSMessagesTopic.PATIENT}:${WSMessagesPatientActions.GET_BY_ID}`:
        const patient = await PatientsService.getPatientById(data.patientId);
        if (patient) {
          ws.send(JSON.stringify({ action: `${WSMessagesTopic.PATIENT}: ${WSMessagesPatientActions.GET_BY_ID}`, data: patient }));
        } else {
          ws.send(JSON.stringify({ action: `${WSMessagesTopic.PATIENT}: ${WSMessagesPatientActions.GET_BY_ID}`, error: 'Patient not found' }));
        }
        break;

      default:
        ws.send(JSON.stringify({ error: 'Unknown patient action' }));
    }
  } catch (error) {
    console.error('Error handling patient message:', error);
    ws.send(JSON.stringify({ error: 'Internal Server Error' }));
  }
};

export default handlePatientMessages;
