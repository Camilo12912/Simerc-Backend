// controllers/emailControlador.js
import respuestasHttp from "../utils/respuestasHttp.js";
import { sendEmail, sendEmails } from "../services/emailService.js";

const enviarCorreoController = async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    if (Array.isArray(to)) {
      // Envía a varios destinatarios
      await sendEmails(to, subject, text);
    } else {
      // Envía a un solo destinatario
      await sendEmail(to, subject, text);
    }

    respuestasHttp.exito(req, res, { message: 'Correo(s) enviado(s) exitosamente' }, 200);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    respuestasHttp.error(req, res, { error: 'Error al enviar el correo' }, 500);
  }
};

const enviarCorreoPorCarreraController = async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    // Lógica para enviar correos por carrera
    const resultadosEnvio = await sendEmails(to, subject, text);

    if (resultadosEnvio && resultadosEnvio.length > 0) {
      respuestasHttp.exito(req, res, { message: 'Correo(s) por carrera enviado(s) exitosamente' }, 200);
    } else {
      respuestasHttp.error(req, res, { error: 'Error al enviar el correo por carrera' }, 500);
    }
  } catch (error) {
    console.error('Error al enviar el correo por carrera:', error);
    respuestasHttp.error(req, res, { error: 'Error al enviar el correo por carrera' }, 500);
  }
};

export { enviarCorreoController, enviarCorreoPorCarreraController };
