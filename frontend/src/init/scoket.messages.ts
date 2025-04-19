import { useRedux } from "../hooks/useRedux";
import useWebSocket from "../hooks/useWebSocket";
import { setPatients } from "../store/slices/pateints.slice";

interface IEvent {
    action: string;
    data: unknown;
}

export const useSocketMessages = () => {
    const {dispatch} = useRedux();
    const {sendMessage} = useWebSocket(import.meta.env.VITE_BACKEND_SOCKET_URL || 'ws://localhost:8080');

    const socketMessageStack = (event: string) => {
        const eventObj = JSON.parse(event) as IEvent;
        const action = eventObj.action;
debugger;
    switch (action) {
        case 'init': 
        console.log('from init:', eventObj.data);
        break;

       case 'PATIENT:GET_ALL':
            console.log('from patients:', eventObj.data);
            dispatch(setPatients(eventObj.data));
            break;

       default:
          console.log('Unknown action:', action);
          return {};
    }
    }

    const initMessage = () => {
        console.log(`initMessage`);
        sendMessage({ action: `patient:getAll`, data: {} });
    }

    return {
        socketMessageStack,
        initMessage
    }
};