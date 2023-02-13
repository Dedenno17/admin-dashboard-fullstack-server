import express from 'express';
import { getAdmins } from '../controllers/management.js';
import { getUserPerformance } from '../controllers/management.js';

const router = express.Router();

// get all admin
router.get('/admins', getAdmins);

// get user peformance
router.get('/peformance/:id', getUserPerformance);

export default router;
