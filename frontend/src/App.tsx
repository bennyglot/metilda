 
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes/routes';

import './App.css'
const App = () => {   
  
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
