import { WebSocket } from 'ws';
import PatientsService from '../../services/patientsService';
import { WSMessagesTopic, WSMessagesLabResultActions } from '../../package/dist';

const handleLabResultMessages = async (ws: WebSocket, action: string, data: any) => {
  try {
    switch (action) {
      case `${WSMessagesTopic.LAB_RESULT}: ${WSMessagesLabResultActions.GET_BY_PATIENT_ID}`:
        const labResultsByPatient = await PatientsService.getLabResultsByTestId(data.patientId, data.testId);
        ws.send(JSON.stringify({ action: `${WSMessagesTopic.LAB_RESULT}: ${WSMessagesLabResultActions.GET_BY_PATIENT_ID}`, data: labResultsByPatient }));
        break;

      case `${WSMessagesTopic.LAB_RESULT}: ${WSMessagesLabResultActions.GET_BY_TEST_ID}`:
        const labResultsByTest = await PatientsService.getLabResultsByTestId(data.patientId, data.testId);
        ws.send(JSON.stringify({ action: `${WSMessagesTopic.LAB_RESULT}: ${WSMessagesLabResultActions.GET_BY_TEST_ID}`, data: labResultsByTest }));
        break;

      default:
        ws.send(JSON.stringify({ error: 'Unknown lab result action' }));
    }
  } catch (error) {
    console.error('Error handling lab result message:', error);
    ws.send(JSON.stringify({ error: 'Internal Server Error' }));
  }
};

export default handleLabResultMessages;
