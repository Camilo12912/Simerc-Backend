// services/emailService.js
import { transporter } from "../config/mailer.js";

const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: transporter.options.auth.user,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.response);
    return info;
  } catch (error) {
    console.error('Error al enviar email:', error);
    throw error; // Lanza el error para manejo general de errores
  }
};

const sendEmails = async (tos, subject, text) => {
  try {
    // Verifica que haya destinatarios antes de enviar correos múltiples
    if (!tos || tos.length === 0) {
      console.warn('No hay destinatarios definidos');
      return; // No hay destinatarios, no se envían correos
    }

    // Envía correos a varios destinatarios
    const emailPromises = tos.map(async (to) => {
      return sendEmail(to, subject, text);
    });

    return await Promise.all(emailPromises);
  } catch (error) {
    console.error('Error al enviar emails:', error);
    throw error; // Lanza el error para manejo general de errores
  }
};

export { sendEmail, sendEmails };
