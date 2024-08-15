const JAVA_BASE_URL =
  import.meta.env.REACT_JAVA_BASE_URL || 'http://localhost:8080/api/v1';
// const NODE_BASE_URL = import.meta.env.REACT_NODE_BASE_URL;
const NODE_BASE_URL =
  import.meta.env.REACT_NODE_BASE_URL || 'http://localhost:3000/api/v1';

export const API = {
  // Node Backend APIs
  LoginAPI: NODE_BASE_URL + '/user/login',
  SignupAPI: NODE_BASE_URL + '/user/',
  LogoutAPI: NODE_BASE_URL + '/user/logout',
  LoginWithGoogleAPI: NODE_BASE_URL + '/auth/google',

  GetUser: NODE_BASE_URL + '/user', // GET /user/userId
  GetAllUsers: NODE_BASE_URL + '/user/', // GET /user
  ChangePassword: NODE_BASE_URL + '/user/password', // PUT /user/password/userId
  GetUserById: NODE_BASE_URL + '/user/my-details', // GET /user/userId
  UpdateMyProfile: NODE_BASE_URL + '/user/update-myprofile',

  // Admin APIs
  GetAdminDashboard: NODE_BASE_URL + '/admin/dashboard/',

  GetAllUsersByAdmin: NODE_BASE_URL + '/admin/users/',
  ResetUserPassword: NODE_BASE_URL + '/admin/users/reset-password/',
  UpdateUserDataByAdmin: NODE_BASE_URL + '/admin/users',
  DeleteUserByAdmin: NODE_BASE_URL + '/admin/users',

  GetAllEventsByAdmin: NODE_BASE_URL + '/admin/events/',

  GetAllTaskByAdmin: NODE_BASE_URL + '/admin/tasks/',

  // Java Backend APIs
  AddEvent: JAVA_BASE_URL + '/events',
  UpdateEvent: JAVA_BASE_URL + '/events',
  DeleteEvent: JAVA_BASE_URL + '/events',
  GetEvents: JAVA_BASE_URL + '/events',
  GetEvent: JAVA_BASE_URL + '/events',
  GetMyEvents: JAVA_BASE_URL + '/events/me',
  GetMyPastEvents: JAVA_BASE_URL + '/events/me/past',
  GetUpcomingEvents: JAVA_BASE_URL + '/events/all-upcoming',

  AddTask: JAVA_BASE_URL + '/tasks',
  UpdateTask: JAVA_BASE_URL + '/tasks',
  DeleteTask: JAVA_BASE_URL + '/tasks',
  GetTasks: JAVA_BASE_URL + '/tasks',
  GetTask: JAVA_BASE_URL + '/tasks',
  GetAsignedTasks: JAVA_BASE_URL + '/tasks/me',
  GetPersonalTasks: JAVA_BASE_URL + '/tasks/personal',
  GetPersonalPastTasks: JAVA_BASE_URL + '/tasks/personal/past',
};
