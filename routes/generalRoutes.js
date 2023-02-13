import express from 'express';
import { getUser, getDashboardStats } from '../controllers/general.js';

const router = express.Router();

// get user
router.get('/user/:id', getUser);

// get dashboard
router.get('/dashboard', getDashboardStats);

export default router;
