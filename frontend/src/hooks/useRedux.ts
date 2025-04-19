 
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AllStates, AppDispatch } from '../store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`

export const useRedux = () => {
  const useAppDispatch = useDispatch<AppDispatch>;
  const useAppSelector: TypedUseSelectorHook<AllStates> = useSelector;
  const dispatch = useAppDispatch();
  
  return {
    useAppDispatch,
    useAppSelector,
    dispatch,
  };
};
