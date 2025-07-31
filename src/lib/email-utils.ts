import nodemailer from 'nodemailer'

// Create transporter with better error handling for serverless environments
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
}

export const sendVerificationEmail = async (email: string, token: string, name: string) => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to MindMate - Verify Your Email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">Welcome to MindMate! 🧠</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Your mental health journey starts here</p>
        </div>
        
        <div style="padding: 30px; background: white;">
          <h2 style="color: #333; margin-bottom: 20px;">Hi ${name},</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Thank you for signing up for MindMate! We're excited to help you track and improve your mental well-being.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
            To complete your registration and start your journey, please verify your email address by clicking the button below:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 25px; 
                      display: inline-block; 
                      font-weight: bold;
                      font-size: 16px;">
              Verify Email Address
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If the button doesn't work, you can copy and paste this link into your browser:
          </p>
          
          <p style="color: #667eea; word-break: break-all; margin-bottom: 30px;">
            <a href="${verificationUrl}" style="color: #667eea;">${verificationUrl}</a>
          </p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h3 style="color: #333; margin-top: 0;">What's next?</h3>
            <ul style="color: #666; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>Verify your email to activate your account</li>
              <li>Complete your profile setup</li>
              <li>Start tracking your daily moods</li>
              <li>View insights and patterns in your mental health</li>
            </ul>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 10px;">
            This verification link will expire in 24 hours for security reasons.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            If you didn't create an account with MindMate, you can safely ignore this email.
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666;">
          <p style="margin: 0; font-size: 14px;">
            © 2024 MindMate. All rights reserved.
          </p>
          <p style="margin: 5px 0 0 0; font-size: 12px;">
            This email was sent to ${email}
          </p>
        </div>
      </div>
    `
  }

  try {
    const transporter = createTransporter()
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email sending error:', error)
    return { success: false, error }
  }
} 