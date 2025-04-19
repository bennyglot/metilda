import express from 'express';
import http from 'http';
import patientsRoutes from './routes/patients';
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

app.use(cors());


// Example REST endpoint
app.get('/api/health', (req, res) => {
  res.status(200).send({ status: 'OK', message: 'Server is running' });
});


// Patients routes
app.use('/api/patients', patientsRoutes);

// Create HTTP server
const server = http.createServer(app);


const startServer = async () => {
server.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
});
};

startServer();

export default app; // Export the app for testing purposes