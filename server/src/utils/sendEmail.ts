// Email sending utility
// You can use nodemailer or any email service

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Send email (placeholder - implement with nodemailer or email service)
 */
export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    // TODO: Implement with nodemailer
    console.log('📧 Email would be sent to:', options.to);
    console.log('Subject:', options.subject);
    console.log('Content:', options.text || options.html);
    
    // Example with nodemailer (uncomment when configured):
    /*
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const message = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    await transporter.sendMail(message);
    */
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Không thể gửi email');
  }
};

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string,
  frontendUrl: string
): Promise<void> => {
  const resetUrl = `${frontendUrl}/dat-lai-mat-khau?token=${resetToken}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Đặt lại mật khẩu</h2>
      <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
      <p>Nhấp vào nút bên dưới để đặt lại mật khẩu:</p>
      <a href="${resetUrl}" 
         style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0;">
        Đặt lại mật khẩu
      </a>
      <p>Hoặc sao chép và dán URL này vào trình duyệt:</p>
      <p style="color: #666;">${resetUrl}</p>
      <p style="color: #999; font-size: 12px; margin-top: 32px;">
        Link này sẽ hết hạn sau 10 phút.<br>
        Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.
      </p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: 'Đặt lại mật khẩu - Nhà Đất',
    html,
  });
};

/**
 * Send verification email
 */
export const sendVerificationEmail = async (
  email: string,
  verificationCode: string
): Promise<void> => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Xác thực tài khoản</h2>
      <p>Chào mừng bạn đến với Nhà Đất!</p>
      <p>Mã xác thực của bạn là:</p>
      <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px; text-align: center; margin: 16px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px;">${verificationCode}</span>
      </div>
      <p style="color: #999; font-size: 12px; margin-top: 32px;">
        Mã này sẽ hết hạn sau 15 phút.<br>
        Nếu bạn không tạo tài khoản này, vui lòng bỏ qua email này.
      </p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: 'Xác thực tài khoản - Nhà Đất',
    html,
  });
};
