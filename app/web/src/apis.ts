import axios from "axios";

export const fetchUsers = () => {
  return axios.get('http://localhost:3000/api/users');
}

export const deleteUser = (id: string) => {
  return axios.delete(`http://localhost:3000/api/users/${id}`);
}

export const addUser = (payload: { name: string }) => {
  return axios.post('http://localhost:3000/api/users', payload);
}
