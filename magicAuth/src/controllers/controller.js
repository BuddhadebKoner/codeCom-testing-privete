import { sendMail } from '../utils/mailTrap.js';

export const sendUrlToEmail = async (req, res) => {
  const { email, url } = req.body;

  console.log(email, url);

  if (!email || !url) {
    return res.status(400).json({ message: 'Email and URL are required.' });
  }

  try {
    const subject = 'Your Requested URL';
    const body = `Here is the link you requested: ${url}`;
    await sendMail(email, subject, body);

    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
};
