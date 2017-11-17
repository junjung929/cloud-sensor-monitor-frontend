import axios from 'axios';

export const FETCH_HOSPITALS = 'fetch_hospitals';
export const FETCH_HOSPITAL = 'fetch_hospital';
export const FETCH_FLOORS_AT = 'fetch_floors_at';
export const FETCH_ROOMS_AT = 'fetch_rooms_at';
export const FETCH_BEDS_AT = 'fetch_beds_at';
export const FETCH_FREE_BEDS_AT = 'fetch_free_beds_at';
export const FETCH_PATIENTS = 'fetch_patients';
export const FETCH_PATIENT = 'fetch_patient';
export const FETCH_PATIENTS_SEACHED = 'fetch_patients_searched';

const ROOT_URL = 'http://localhost:3000/api';

export function fetchHospitals() {
    const url = `${ROOT_URL}/hospitals`;
    const request = axios.get(url);

    return {
        type: FETCH_HOSPITALS,
        payload: request
    }
}
export function fetchHospital(id) {
    const query = `/id=${id}`;
    const url = `${ROOT_URL}/hospitals${query}`;
    const request = axios.get(url);
    
    return {
        type: FETCH_HOSPITAL,
        payload: request
    }
}
export function fetchFloorsAt(id){
    const query = `/hospital=${id}`;
    const url = `${ROOT_URL}/floors${query}`;
    const request = axios.get(url);
    
    return {
        type: FETCH_FLOORS_AT,
        payload: request
    }
}
export function fetchRoomsAt(id){
    const query = `/floor=${id}`;
    const url = `${ROOT_URL}/rooms${query}`;
    const request = axios.get(url);
    
    return {
        type: FETCH_ROOMS_AT,
        payload: request
    }
}
export function fetchBedsAt(id){
    const query = `/room=${id}`;
    const url = `${ROOT_URL}/beds${query}`;
    const request = axios.get(url);
    
    return {
        type: FETCH_BEDS_AT,
        payload: request
    }
}
export function fetchFreeBedsAt(id){
    const query = `/free/room=${id}`;
    const url = `${ROOT_URL}/beds${query}`;
    const request = axios.get(url);
    
    return {
        type: FETCH_FREE_BEDS_AT,
        payload: request
    }
}
export function fetchPatients() {
    const url = `${ROOT_URL}/patients`;
    const request = axios.get(url);

    return {
        type: FETCH_PATIENTS,
        payload: request
    }
}
export function fetchPatient(id) {
    const query = `/id=${id}`;
    const url = `${ROOT_URL}/patients${query}`;
    const request = axios.get(url);

    return {
        type: FETCH_PATIENTS,
        payload: request
    }
}
export function fetchPatientsSearched(searchByName) {
    const query = `/searchByName=${searchByName}`;
    const url = `${ROOT_URL}/patients${query}`;
    const request = axios.get(url);

    return {
        type: FETCH_PATIENTS_SEACHED,
        payload: request
    }
}/* 
export function fetchPatientsSearchedHospital(searchByName) {
    const query = `/searchByName=${searchByName}`;
    const url = `${ROOT_URL}/hospitals${query}`;
    const request = axios.get(url);

    return {
        type: FETCH_PATIENTS_SEACHED,
        payload: request
    }
} */