import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/tasks';

export const getTasks = async (userId, filter) => {
  const res = await axios.get(`${BASE_URL}/${userId}?filter=${filter}`);
  return res.data;
};

export const createTask = async (task) => {
  const res = await axios.post(BASE_URL, task);
  return res.data;
};

export const toggleComplete = async (id) => {
  const res = await axios.put(`${BASE_URL}/toggle/${id}`);
  return res.data;
};

export const softDelete = async (id) => {
  const res = await axios.put(`${BASE_URL}/trash/${id}`);
  return res.data;
};

export const restoreTask = async (id) => {
  const res = await axios.put(`${BASE_URL}/restore/${id}`);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
