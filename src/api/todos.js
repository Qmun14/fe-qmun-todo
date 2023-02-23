// import dotenv from 'dotenv';
import Axios from 'axios';
import { config } from '../config';


export const getTodos = () => {
    return Axios.get(`${config.api_url}/api/v1/todos`);
}
export const createTodo = (data) => {
    return Axios.post(`${config.api_url}/api/v1/todos`, data);
}
