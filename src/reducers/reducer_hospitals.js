import _ from 'lodash';
import {
    FETCH_HOSPITALS,
    FETCH_HOSPITAL,
    FETCH_FLOORS_AT,
    FETCH_FLOOR,
    FETCH_ROOMS_AT,
    FETCH_ROOM,
    FETCH_BEDS_AT,
    FETCH_BED,
    FETCH_SENSOR_DATA
} from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_SENSOR_DATA:
            return { ...state, sensor_data: action.payload.data };
        case FETCH_BED:
            return { ...state, bed: action.payload.data };
        case FETCH_BEDS_AT:
            return { ...state, beds_at: action.payload.data };
        case FETCH_ROOM:
            return { ...state, room: action.payload.data };
        case FETCH_ROOMS_AT:
            return { ...state, rooms_at: action.payload.data };
        case FETCH_FLOOR:
            return { ...state, floor: action.payload.data };
        case FETCH_FLOORS_AT:
            return { ...state, floors_at: action.payload.data };
        case FETCH_HOSPITAL:
            return { ...state, hospital: action.payload.data };
        case FETCH_HOSPITALS:
            return _.mapKeys(action.payload.data, '_id');
        default:
            return state;
    }
}