export const authRole = {
  Admin: ['admin'],
  User: ['user', 'admin'],
};

export const RoutePermittedRole = {
  Admin: 'admin',
  User: 'user',
};
export const defaultUser = {
  displayName: 'John Alex',
  email: 'demo@example.com',
  token: 'access-token',
  role: 'user',
  photoURL: '/assets/images/avatar/A11.jpg',
};
export const initialUrl = '/sample/GroupCalender'; // this url will open after login
