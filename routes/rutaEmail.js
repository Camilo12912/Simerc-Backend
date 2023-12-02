import express from 'express';
import { enviarCorreoController, enviarCorreoPorCarreraController } from '../controllers/emailControlador.js';

const router = express.Router();

router.post('/send-email', enviarCorreoController);
router.post('/enviar-correo-por-carrera', enviarCorreoPorCarreraController);

export default router;