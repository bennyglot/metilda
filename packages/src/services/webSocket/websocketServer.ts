import { WebSocketServer, WebSocket } from 'ws';

type MessageHandler = (ws: WebSocket, action: string, data: any) => Promise<void>;

interface WebSocketServiceOptions {
  port: number;
  messageHandlers: Record<string, MessageHandler>;
}

class WebSocketService {
  private static instance: WebSocketService;
  private wss: WebSocketServer;
  private messageHandlers: Record<string, MessageHandler>;

  private constructor({ port, messageHandlers }: WebSocketServiceOptions) {

    this.wss = new WebSocketServer({ port });
    this.messageHandlers = messageHandlers;

    this.wss.on('connection', (ws: WebSocket) => {
      console.log('Client connected');

      // Handle incoming messages from clients
      ws.on('message', async (message: string) => {
        try {
          const parsedMessage = JSON.parse(message);
          const { action, data } = parsedMessage;

          // Delegate to the appropriate message handler
          const handler = this.messageHandlers[action];
          if (handler) {
            await handler(ws, action, data);
          } else {
            ws.send(JSON.stringify({ error: 'Unknown action' }));
          }
        } catch (error) {
          console.error('Error handling WebSocket message:', error);
          ws.send(JSON.stringify({ error: 'Internal Server Error' }));
        }
      });

      // Handle client disconnection
      ws.on('close', () => {
        console.log('Client disconnected');
      });

      // Send a welcome message to the client
      ws.send('Welcome to the WebSocket server!');
    });

    console.log(`WebSocket server is running on ws://localhost:${port}`);
  }

  public static getInstance(options: WebSocketServiceOptions): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService(options);
    }
    return WebSocketService.instance;
  }

  public broadcast(message: string): void {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

export default WebSocketService;
