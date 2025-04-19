import { Route, Routes } from 'react-router-dom';
import {AppLayout} from '../components/AppLayout';
import {Patients} from '../pages/patients';
import { LabResults } from '../pages/labResults';
import {LabResult} from '../pages/labResult';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* App container route */}
      <Route path="/" element={<AppLayout />}>
          <Route path="patients" element={<Patients />} >
            <Route path=":patientId" element={<LabResults />}>
              <Route path=":testId" element={<LabResult />} />
          </Route>
         </Route>
      </Route>
    </Routes>
  );
};
