// import dotenv from 'dotenv';
import Axios from 'axios';
import { config } from '../config';


export const getTodos = () => {
    return Axios.get(`${config.api_url}/api/v1/todos`);
}
export const getOneTodo = (id) => {
    return Axios.get(`${config.api_url}/api/v1/todos/${id}`);
}
export const createTodo = (data) => {
    return Axios.post(`${config.api_url}/api/v1/todos`, data);
}
export const updateTodo = (id, data) => {
    return Axios.put(`${config.api_url}/api/v1/todos/${id}`, data);
}
export const deleteTodo = (id) => {
    return Axios.delete(`${config.api_url}/api/v1/todos/${id}`);
}
