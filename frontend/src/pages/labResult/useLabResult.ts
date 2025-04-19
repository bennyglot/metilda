import { useParams } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useRedux } from '../../hooks/useRedux';
import { setSelectedPatient } from '../../store/slices/pateints.slice';
import { useEffect } from 'react';
import { IPatientDetails, IPaginatedResponse } from '../../types';

export const useLabResult = () => {
    const { fetchApi, loading } = useApi();
    const { useAppSelector, dispatch} = useRedux();
    const {selectedPatient} = useAppSelector(store => store.patients);
    const { patientId } = useParams();
    
    useEffect(() => {
        const getSelectPatient = async () => {
            const patient = await fetchApi<IPaginatedResponse<IPatientDetails>>(`/patients/${patientId}`);
            if (!patient) {
                return;
            }

            dispatch(setSelectedPatient(patient.data[0]));
        };

        const fetchSelectedPatient = async () => {
            await getSelectPatient();
        };
        
        fetchSelectedPatient();
    }, [dispatch, fetchApi, patientId]);
    
    
    return { patientId, selectedPatient, loading };
}