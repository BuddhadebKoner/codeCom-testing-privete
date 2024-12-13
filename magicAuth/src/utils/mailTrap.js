import dotenv from 'dotenv';``
dotenv.config();

import nodemailer from 'nodemailer';

var transport = nodemailer.createTransport({
   host: process.env.MAILTRAP_HOST,
   port: parseInt(process.env.MAILTRAP_PORT),
   auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
   }
});

export const sendMail = async (to, subject, text) => {
   const mailOptions = {
      from: `"MagicAuth" <${process.env.MAIL_TRAP_MAIL_SENDER}>`,
      to,
      subject,
      text,
   };

   const res = await transport.sendMail(mailOptions);
   console.log('Email sent:', res);
};
