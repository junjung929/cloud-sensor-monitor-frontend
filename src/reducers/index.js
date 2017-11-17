import { combineReducers } from 'redux';
import HospitalsReducer from './reducer_hospitals';
import PatientsReducer from './reducer_patients';

const rootReducer = combineReducers({
  hospitals: HospitalsReducer,
  patients: PatientsReducer
});

export default rootReducer;
