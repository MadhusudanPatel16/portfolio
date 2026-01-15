import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://portfolio-backend-a2oq.onrender.com/api",
});

export default axiosClient;
