import axios from 'axios';
import { Usuario, UsuarioCreate } from '../interfaces/Usuario';
import { Response } from '../interfaces/Response';

const API_URL = 'http://localhost:8181/api/usuarios';

export const getAllUsers = async (): Promise<Response> => {
    const response = await axios.get(API_URL, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*' // Could work and fix the previous problem, but not in all APIs
        }
    }).then(res => res.data).catch(err => err.response.data);
    return response;
};

export const getUser = async (id: number): Promise<Usuario> => {
    const response = await axios.get(`${API_URL}/${id}`)
        .then(res => res.data)
        .catch(err => err.response.data);
    return response;
};

export const createUser = async (user: UsuarioCreate): Promise<Response> => {
    const response = await axios.post(API_URL, user)
        .then(res => res.data)
        .catch(err => err.response.data);
    return response;
};

export const updateUser = async (id: number, user: Usuario): Promise<Response> => {
    const response = await axios.put(`${API_URL}/${id}`, user)
        .then(res => res.data)
        .catch(err => err.response.data);
    return response;
};

export const deleteUser = async (id: number): Promise<Response> => {
    const response = await axios.delete(`${API_URL}/${id}`)
        .then(res => res.data)
        .catch(err => err.response.data);
    return response;
};