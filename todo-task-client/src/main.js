import { createApp } from 'vue'
import App from './App.vue'

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tasks';

export const getTasks = () => axios.get(API_URL);
export const createTask = (task) => axios.post(API_URL, task);
export const updateTask = (id, task) => axios.put(`${API_URL}/${id}`, task);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);

createApp(App).mount('#app')
