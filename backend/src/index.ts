import express from 'express';
import http from 'http';
import WebSocketService from './package/dist/services/webSocket/websocketServer';
import {CombinedMessages} from './websocket/messages';

const app = express();
const PORT = 3000;
const WS_PORT = 8080;

// Middleware
app.use(express.json());

// Example REST endpoint
app.get('/api/health', (req, res) => {
  res.status(200).send({ status: 'OK', message: 'Server is running' });
});

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket server



const webSocketService = WebSocketService.getInstance({
  port: WS_PORT,
  messageHandlers: CombinedMessages,
});

// Start the HTTP server
server.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
});

// Start the WebSocket server
webSocketService;