import axios from 'axios';

const USER_BASE_URL = 'http://localhost:8080/user';
const OTP_BASE_URL = 'http://localhost:8080/otp';

export const signup = (formData) => {
  return axios.post(`${USER_BASE_URL}/create`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const login = (params) => {
  return axios.get(`${USER_BASE_URL}/login`, { params });
};

export const resendOtp = (email) => {
  return axios.post(`${OTP_BASE_URL}/resend`, { email });
};

export const sendOtp = (email) => {
  return axios.post(`${OTP_BASE_URL}/send-otp`, { email });
};

export const verifyOtp = (email, otp) => {
  return axios.post(`${OTP_BASE_URL}/verify-otp?otp=${otp}`, { email });
};
