import nodemailer from 'nodemailer';
import { ENV } from '../config/env.js';

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    if (!ENV.EMAIL_USER || !ENV.EMAIL_PASS) {
      console.log(`[Email Mocked] To: ${to} | Subject: ${subject}`);
      return;
    }

    const transporter = nodemailer.createTransport({
      host: ENV.EMAIL_HOST,
      port: Number(ENV.EMAIL_PORT),
      auth: {
        user: ENV.EMAIL_USER,
        pass: ENV.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${ENV.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error(`[Email Failed] ${error.message}`);
  }
};
