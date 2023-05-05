import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

// process.env.REACT_APP_API_URL
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://103.54.56.168',
  // credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
  tagTypes: ['Categories', 'Users', 'Foods', 'Orders', 'Statistics'],
});

const $host = axios.create({
  baseURL: 'http://103.54.56.168',
});

const $authHost = axios.create({
  baseURL: 'http://103.54.56.168',
});

$authHost.interceptors.request.use((config: any) => {
  (config.headers as AxiosRequestHeaders).authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export { $host, $authHost };
