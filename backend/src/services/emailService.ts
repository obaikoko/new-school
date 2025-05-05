import nodemailer from 'nodemailer';
import { SendBulkMailProps, SendSingleMailProps } from '../schemas/userSchema';

const sendSingleMail = async ({ email, subject, text }: SendSingleMailProps): Promise<boolean> => {
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
        name: 'NEWSCHOOL INTERNATIONAL SCHOOLS',
        address: 'newschoolsschools@gmail.com',
      },
      to: email,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #fafafa;">
          <div style="text-align: center;">
            <img src="https://res.cloudinary.com/dzajrh9z7/image/upload/v1721855840/Newschools/m5eqmos5mf6tq1pg7lrg.jpg" alt="Newschool International School Logo" style="width: 150px; margin-bottom: 20px;">
          </div>
          <h3 style="color: #004b87; text-align: center; font-size: 22px; margin-bottom: 20px;">Welcome Back</h3>
          <p style="font-size: 14px; line-height: 1.6; color: #555;">${text}</p>
          <p style="font-size: 14px; line-height: 1.6; color: #555;">Best regards,</p>
          <p style="font-weight: bold; color: #004b87;">The Newschool International Schools Team</p>
          <hr style="border: 0; height: 1px; background-color: #e0e0e0; margin: 30px 0;">
          <div style="text-align: center; font-size: 12px; color: #999;">
            <p>If you have any questions, feel free to contact us at <a href="mailto:newschoolsschools@gmail.com" style="color: #004b87; text-decoration: none;">newschoolsschools@gmail.com</a>.</p>
            <p>&copy; 2024 Newschool International Schools. All rights reserved.</p>
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

const sendBulkMail = async ({ emails, subject, text }: SendBulkMailProps): Promise<boolean> => {
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
