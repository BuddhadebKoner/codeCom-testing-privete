import express from 'express';
import { sayHello } from '../controllers/controller.js';

const router = express.Router();

router.get('/', sayHello);

export default router;
