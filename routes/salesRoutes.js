import express from 'express';
import { getSales } from '../controllers/sales.js';

const router = express.Router();

// get overall stat
router.get('/sales', getSales);

export default router;
