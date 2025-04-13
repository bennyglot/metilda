import { WSMessagesTopic, WSMessagesPatientActions, WSMessagesLabResultActions } from "../../package/dist";
import handleLabResultMessages from "./labResultMessages";
import handlePatientMessages from "./patientMessages";

// Combine message handlers
export const CombinedMessages = {
    ...{
      [`${WSMessagesTopic.PATIENT}: ${WSMessagesPatientActions.GET_ALL}`]: handlePatientMessages,
      [`${WSMessagesTopic.PATIENT}: ${WSMessagesPatientActions.GET_BY_ID}`]: handlePatientMessages,
      [`${WSMessagesTopic.LAB_RESULT}: ${WSMessagesLabResultActions.GET_BY_PATIENT_ID}`]: handleLabResultMessages,
      [`${WSMessagesTopic.LAB_RESULT}: ${WSMessagesLabResultActions.GET_BY_TEST_ID}`]: handleLabResultMessages,
    },
  };
