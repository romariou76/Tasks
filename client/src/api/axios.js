import axios from "axios";
import { API_URL } from "../config";

const API = 'http://localhost:4000/api'

const instance = axios.create({
  baseURL: API,
  withCredentials: true,
});

export default instance;
