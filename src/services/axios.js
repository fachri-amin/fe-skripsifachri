import axios from "axios";
import CONFIG from "../config/env";

const BASE_URL = CONFIG.endpoint.API_ENDPOINT;
let instance = null;

function makeInstance() {
  if (instance) {
    return instance;
  }
  instance = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
  });

  return instance;
}

const axiosInstance = makeInstance();

export const setAuthHeader = (accessToken) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export const resetAuthHeader = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
};

export default axiosInstance;
