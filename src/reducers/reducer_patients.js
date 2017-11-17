import _ from 'lodash';
import {
    FETCH_PATIENTS,
    FETCH_PATIENT,
    FETCH_PATIENTS_SEACHED
} from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_PATIENTS_SEACHED:
            return { ...state, patients_searched: action.payload.data };
        case FETCH_PATIENT:
            return { ...state, [action.payload.data.id]: action.payload.data};
        case FETCH_PATIENTS:
            return _.mapKeys(action.payload.data, '_id');
        default:
            return state;
    }
}