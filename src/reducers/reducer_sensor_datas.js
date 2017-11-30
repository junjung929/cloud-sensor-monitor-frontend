import _ from 'lodash';
import {
    FETCH_WDATA
} from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_WDATA:
            return { ...state, state: action.payload.data };
        default:
            return state;
    }
}