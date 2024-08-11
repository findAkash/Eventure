const JAVA_BASE_URL = import.meta.env.REACT_JAVA_BASE_URL;
// const NODE_BASE_URL = import.meta.env.REACT_NODE_BASE_URL;
const NODE_BASE_URL =
  import.meta.env.REACT_NODE_BASE_URL || 'http://localhost:3000/api/v1';

export const API = {
  LoginAPI: NODE_BASE_URL + '/user/login',
  SignupAPI: NODE_BASE_URL + '/user/',
  LogoutAPI: NODE_BASE_URL + 'user//logout',
};
