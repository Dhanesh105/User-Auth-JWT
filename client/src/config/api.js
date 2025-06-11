// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? window.location.origin 
    : 'http://localhost:5000');

export const API_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/api/register`,
  LOGIN: `${API_BASE_URL}/api/login`,
  PROFILE: `${API_BASE_URL}/api/myprofile`,
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL;
