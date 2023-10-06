import axios from "./axios";

const API = 'http://localhost:4000/api'


export const registerRequest = async (user) => axios.post(`${API}/register`, user);

export const loginRequest = async (user) => axios.post(`${API}/login`, user);

export const verifyTokenRequest = async () => axios.get(`${API}/verify`);
