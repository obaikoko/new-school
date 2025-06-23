import nodemailer from 'nodemailer';
import { SendBulkMailProps, SendSingleMailProps } from '../schemas/userSchema';

const sendSingleMail = async ({
  email,
  subject,
  text,
}: SendSingleMailProps): Promise<boolean> => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.GMAILEMAIL,
        pass: process.env.GMAILPASSWORD,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    const mailOptions = {
      from: {
        name: 'BERYL INTERNATIONAL SCHOOLS',
        address: 'berylintschl@gmail.com',
      },
      to: email,
      subject,
      html: `
       <div style="font-family: Arial, sans-serif; color: #333; padding: 24px; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="https://res.cloudinary.com/dzajrh9z7/image/upload/v1726781636/beryl/epfme50v5t4l66i6fzx3.jpg" alt="Beryl International School Logo" style="width: 120px; border-radius: 8px;">
  </div>

  <h2 style="color: #004b87; text-align: center; font-size: 24px; margin-bottom: 16px;">Welcome Back</h2>

  <p style="font-size: 15px; line-height: 1.7; color: #444; margin-bottom: 16px;">
    ${text}
  </p>

  <p style="font-size: 15px; line-height: 1.7; color: #444; margin-bottom: 6px;">Best regards,</p>
  <p style="font-weight: bold; color: #004b87; margin-bottom: 24px;">The Beryl International Schools Team</p>

  <hr style="border: none; height: 1px; background-color: #e0e0e0; margin: 30px 0;">

  <div style="text-align: center; font-size: 13px; color: #999;">
    <p>If you have any questions, contact us at 
      <a href="mailto:admin@berylintlschs.org" style="color: #004b87; text-decoration: none;">admin@berylintlschs.org</a>.
    </p>
    <p style="margin-top: 4px;">&copy; 2025 Beryl International Schools. All rights reserved.</p>
  </div>
</div>

      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(error);
    throw new Error('Email could not be sent.');
  }
};

const sendBulkMail = async ({
  emails,
  subject,
  text,
}: SendBulkMailProps): Promise<boolean> => {
  try {
    for (const email of emails) {
      await sendSingleMail({ email, subject, text });
    }
    return true;
  } catch (error) {
    console.error('Error sending bulk emails:', error);
    throw new Error('Bulk email sending failed.');
  }
};

export { sendSingleMail, sendBulkMail };
