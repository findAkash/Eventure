import { UserAPI } from './user.js';
import express from 'express';

export class API {
  static instance() {
    const router = express.Router();
    router.use('/user', UserAPI.instance());

    return router;
  }
}
