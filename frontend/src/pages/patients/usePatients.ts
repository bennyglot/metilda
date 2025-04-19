/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useApi } from "../../hooks/useApi"
import { useRedux } from "../../hooks/useRedux";
import { setPatients } from "../../store/slices/pateints.slice";
import { IPaginatedResponse } from "../../types";

export const usePatients = () => {
    const { fetchApi, loading } = useApi();
    const { useAppSelector, dispatch} = useRedux();
    const { patients } = useAppSelector(store => store.patients);
  
    useEffect   (() => {
        const getPatients = async () => {
            const patients = await fetchApi<IPaginatedResponse<any>>('/patients');
            dispatch(setPatients(patients?.data || []));
        };

        const fetchPatients = async () => {
            await getPatients();
        }
        
        fetchPatients();
    }, [dispatch, fetchApi]);
    
    return {
        patients,
        loading
    }
}