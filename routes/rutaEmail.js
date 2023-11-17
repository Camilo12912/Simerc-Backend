import express from 'express';
import { sendEmailController } from '../controllers/emailControlador.js';

const router = express.Router();

router.post('/send-email', sendEmailController);

export default router;