import { UserAPI } from './user.js';
import express from 'express';
import { OAuthGoogleAPI } from './auth/OAuthGoogle.js';
import { AdminAPI } from './admin/index.js';

export class API {
  static instance() {
    const router = express.Router();
    router.use('/user', UserAPI.instance());
    router.use('/auth', OAuthGoogleAPI.instance());
    router.use('/admin', AdminAPI.instance());

    return router;
  }
}
