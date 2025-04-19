/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes/routes';

import './App.css'
import useWebSocket from './hooks/useWebSocket';
import { useSocketMessages } from './init/scoket.messages';
import { useEffect } from 'react';

const App = () => {   
  const backendSocketUrl = import.meta.env.VITE_BACKEND_SOCKET_URL || 'ws://localhost:8080';

  const { isConnected, sendMessage } = useWebSocket(backendSocketUrl);
  const {initMessage} = useSocketMessages();

  useEffect(() => {
    console.log(`isConnected: ${isConnected}`);
    if (isConnected) {
      // Wait for next tick to ensure connection is fully established
      setTimeout(() => {
        initMessage();
      }, 0);
    }
  }, []);
    
  


  // Example: Send a message when the WebSocket is connected
  if (isConnected) {
    sendMessage({ action: 'init', data: { message: 'WebSocket initialized in App' } });
  }


  
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
