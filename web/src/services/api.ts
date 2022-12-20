import axios, { AxiosRequestConfig } from "axios";
import { parseCookies } from "nookies";
import { useNavigate } from "react-router-dom";
import { getUserLocalStorage, setUserLocalStorage } from "../contexts/auth/authFunctions";

// export function getAPIClient(ctx?: any) {
// const { 'nextauth.token': token } = parseCookies(ctx)

export const Api = axios.create({
  baseURL: 'http://localhost:8000/api'
  // baseURL: 'https://green-voice-2815.fly.dev/api'
})

Api.interceptors.request.use(
  config => {
    const user = getUserLocalStorage();

    if (!config)
      return config;

    config.headers = { 'Authorization': `Bearer ${user?.token ?? ''}`, 'Accept': 'application/json' }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  response => {
    return response;
  },
  ({response}) => {    
    if (response.status == 401) {
      setUserLocalStorage(null);
      window.location.reload();
    }

    return Promise.reject(response);
  }
);

  // if (token) {
  //   api.defaults.headers['Authorization'] = `Bearer ${token}`;
  // }

  // return api;
// }