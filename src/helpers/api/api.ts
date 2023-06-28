import axios, { AxiosRequestHeaders } from 'axios';

const $host = axios.create({
  baseURL: 'http://grand.rassrochkabizler.uz',
});

const $authHost = axios.create({
  baseURL: 'http://grand.rassrochkabizler.uz',
});

$authHost.interceptors.request.use((config) => {
  (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export { $authHost, $host };
