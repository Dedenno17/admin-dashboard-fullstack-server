import express from 'express';
import {
  getCustomers,
  getGeography,
  getProducts,
  getTransactions,
} from '../controllers/client.js';

const router = express.Router();

// get all products with stats
router.get('/products', getProducts);

// get all customers
router.get('/customers', getCustomers);

// get transaction
router.get('/transactions', getTransactions);

// get geography
router.get('/geography', getGeography);

export default router;
