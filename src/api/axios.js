import axios from 'axios';
import { store } from '../redux/store';

export function setupAxios(serverUrl) {
  const cancels = new Map();

  axios.interceptors.request.use(
    req => {
      const { url, method } = req;
      const { accessToken } = store.getState().auth;
      req.timeout = 50000;

      if (!req.baseURL) {
        req.baseURL = serverUrl + '/api';
      }

      if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
      }

      if (method.toLowerCase() === 'get') {
        const currentCancel = cancels.get(`${method}:${url}`);

        if (currentCancel) {
          currentCancel();
        }

        req.cancelToken = new axios.CancelToken(cancel => {
          cancels.set(`${method}:${url}`, cancel);
        });
      }

      return req;
    },
    err => Promise.reject(err),
  );

  axios.interceptors.response.use(
    response => {
      const { url, method } = response.config;
      if (method.toLowerCase() === 'get') {
        cancels.delete(`${method}:${url}`);
      }
      return response.data;
    },
    error => {
      if (axios.isCancel(error)) {
        return new Promise(() => {});
      }

      if (error.response?.config) {
        const { url, method } = error.response.config;
        if (method.toLowerCase() === 'get') {
          cancels.delete(`${method}:${url}`);
        }
      }

      return Promise.reject(error);
    },
  );
}
