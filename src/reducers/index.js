import { combineReducers } from 'redux';
import HospitalsReducer from './reducer_hospitals';
import PatientsReducer from './reducer_patients';
import SensorDatasReducer from './reducer_sensor_datas';

const rootReducer = combineReducers({
  hospitals: HospitalsReducer,
  patients: PatientsReducer,
  sensorDatas: SensorDatasReducer
});

export default rootReducer;
