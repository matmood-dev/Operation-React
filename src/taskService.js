import axios from 'axios';

const API_URL = 'https://operation-nodejs.onrender.com/api'; // Use the deployed URL

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const updateTask = async (task) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${task.id}`, task);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
