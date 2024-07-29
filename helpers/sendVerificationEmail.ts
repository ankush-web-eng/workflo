import { ApiResponse } from "@/types/ApiResponse";

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  tls: {
    ciphers: "SSLv3",
  },
  secure: false, 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendVerificationEmail(email: string,
  name: string,
  verifyCode: string): Promise<ApiResponse> {

  const mailOptions = {
    from: `"Ankush" <${process.env.EMAIL}>`,
    to: email,
    subject: "Workflo - Verify your email",
    text: `Hello ${name}, Your verification code is ${verifyCode}`,
    html: `<b>Hello ${name}, Your verification code is ${verifyCode}</b>`,
  }

  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err: Error, info: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });

    return { success: true, message: 'Verification email sent successfully.' };
  } catch (error) {
    return { success: false, message: 'Failed to send verification email.' };
  }
}