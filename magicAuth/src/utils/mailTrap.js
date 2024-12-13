import nodemailer from 'nodemailer';

var transport = nodemailer.createTransport({
   host: "sandbox.smtp.mailtrap.io",
   port: 2525,
   auth: {
      user: "db45e5dce9f0ee",
      pass: "dbbcc9955976e1"
   }
});

export const sendMail = async (to, subject, text) => {
   const mailOptions = {
      from: '"MagicAuth" <jeetkoner36@gmail.com>',
      to,
      subject,
      text,
   };

   const res = await transport.sendMail(mailOptions);
   console.log('Email sent:', res);
};
