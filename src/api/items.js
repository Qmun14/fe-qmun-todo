// import dotenv from 'dotenv';
import Axios from 'axios';
import { config } from '../config';


export const getOneItem = (id) => {
    return Axios.get(`${config.api_url}/api/v1/items/${id}`);
}
export const createItem = (data) => {
    return Axios.post(`${config.api_url}/api/v1/items`, data);
}
export const updateItem = (id, data) => {
    return Axios.put(`${config.api_url}/api/v1/items/${id}`, data);
}
export const deleteItem = (id) => {
    return Axios.delete(`${config.api_url}/api/v1/items/${id}`);
}
export function moveItem(id, data) {
    return Axios.put(`${config.api_url}/api/v1/items/${id}/move`, data);
}