import express from 'express';
import { sendUrlToEmail } from '../controllers/controller.js';

const router = express.Router();

// Email sending route
router.post('/send-email', sendUrlToEmail);

export default router;
