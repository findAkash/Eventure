const JAVA_BASE_URL =
  import.meta.env.REACT_JAVA_BASE_URL || 'http://localhost:8080/api/v1';
// const NODE_BASE_URL = import.meta.env.REACT_NODE_BASE_URL;
const NODE_BASE_URL =
  import.meta.env.REACT_NODE_BASE_URL || 'http://localhost:3000/api/v1';

export const API = {
  LoginAPI: NODE_BASE_URL + '/user/login',
  SignupAPI: NODE_BASE_URL + '/user/',
  LogoutAPI: NODE_BASE_URL + '/user/logout',
  LoginWithGoogleAPI: NODE_BASE_URL + '/auth/google',

  // Java Backend APIs
  AddEvent: JAVA_BASE_URL + '/events',
  UpdateEvent: JAVA_BASE_URL + '/events',
  DeleteEvent: JAVA_BASE_URL + '/event',
  GetEvents: JAVA_BASE_URL + '/events',
  GetEvent: JAVA_BASE_URL + '/event',
  GetMyEvents: JAVA_BASE_URL + '/events/me',
};
