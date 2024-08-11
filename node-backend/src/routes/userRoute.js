import express from 'express';
import passport from 'passport';
import {
  loadAuth,
  successGoogleLogin,
  failureGoogleLogin,
} from '../controllers/userController.js';
import '../../passport.js';

const router = express();

// Initialize Passport middleware
router.use(passport.initialize());
router.use(passport.session());

// Route to load authentication
router.get('/auth', loadAuth);

// Google authentication route
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

// Google authentication callback route
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/success',
    failureRedirect: '/failure',
  })
);

// Success route
router.get('/success', successGoogleLogin);

// Failure route
router.get('/failure', failureGoogleLogin);

export default router;
