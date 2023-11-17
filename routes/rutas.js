// routes/index.js
import { Router } from 'express';
import routerUsuario from './rutasUsuario.js';
import routerRol from './rutasRol.js';
import routerRecordatorio from './rutasRecordatorio.js';
import routerAlumno from './rutasAlumnos.js';
import rutaEmail from './rutaEmail.js'; // Importa las rutas de correo

const router = Router();

router.use('/usuario', routerUsuario);
router.use('/roles', routerRol);
router.use('/alumnos', routerAlumno);
router.use('/recordatorios', routerRecordatorio);
router.use('/email', rutaEmail); // Agrega las rutas de correo

export default router;

