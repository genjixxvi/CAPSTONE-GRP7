import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;

      if (response && response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
      }

      if (response && response.status >= 400 && response.status < 500) {
        console.error(`Client error: ${response.data.message}`);
      } else if (response && response.status >= 500) {
        console.error("Server error: Please try again later.");
      }
    } catch (err) {
      console.error("Error in axios response interceptor", err);
    }
    throw error;
  }
);

export default axiosClient;
