import axios from "axios";

const API_URL = 'http://localhost:3000/api';

export const fetchUsers = () => {
  return axios.get(`${API_URL}/users`);
}

export const deleteUser = (id: string) => {
  return axios.delete(`${API_URL}/users/${id}`);
}

export const addUser = (payload: { name: string }) => {
  return axios.post(`${API_URL}/users`, payload);
}
