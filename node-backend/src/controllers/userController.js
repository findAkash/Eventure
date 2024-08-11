// Function to render the authentication page
export const loadAuth = (req, res) => {
  res.render('auth');
};

// Function to handle successful Google login
export const successGoogleLogin = (req, res) => {
  if (!req.user) res.redirect('/failure');
  console.log(req.user);
  res.send('Welcome ' + req.user.email);
};

// Function to handle failed Google login
export const failureGoogleLogin = (req, res) => {
  res.send('Error');
};
