import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://40.81.240.147',
  headers: {
    'Content-Type': 'application/json',
  },
});
