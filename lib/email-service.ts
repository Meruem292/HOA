import nodemailer from "nodemailer"

// Email configuration
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface EmailData {
  to: string
  subject: string
  html: string
  attachments?: Array<{
    filename: string
    content: Buffer
    contentType: string
  }>
}

export async function sendEmail(emailData: EmailData): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || "noreply@hoa.com",
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
      attachments: emailData.attachments,
    })
    return true
  } catch (error) {
    console.error("Email sending failed:", error)
    return false
  }
}

// Email templates
export const emailTemplates = {
  paymentReminder: (homeownerName: string, amount: number, dueDate: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Payment Reminder</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Homeowners Association</p>
      </div>
      
      <div style="padding: 30px; background: #f8fafc;">
        <p style="font-size: 16px; color: #334155;">Dear ${homeownerName},</p>
        
        <p style="color: #64748b; line-height: 1.6;">
          This is a friendly reminder that your monthly dues payment of <strong>₱${amount.toLocaleString()}</strong> 
          is due on <strong>${dueDate}</strong>.
        </p>
        
        <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #2563eb;">
          <h3 style="margin: 0 0 10px 0; color: #1e293b;">Payment Details</h3>
          <p style="margin: 5px 0; color: #64748b;">Amount Due: <strong>₱${amount.toLocaleString()}</strong></p>
          <p style="margin: 5px 0; color: #64748b;">Due Date: <strong>${dueDate}</strong></p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Pay Now
          </a>
        </div>
        
        <p style="color: #64748b; font-size: 14px;">
          If you have already made this payment, please disregard this notice.
        </p>
        
        <p style="color: #64748b; font-size: 14px;">
          For questions, contact us at admin@hoa.com or +63 912 345 6789.
        </p>
      </div>
      
      <div style="background: #e2e8f0; padding: 20px; text-align: center; color: #64748b; font-size: 12px;">
        <p style="margin: 0;">© 2025 Homeowners Association. All rights reserved.</p>
      </div>
    </div>
  `,

  paymentConfirmation: (homeownerName: string, amount: number, paymentDate: string, referenceNumber: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #059669, #047857); color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Payment Confirmed</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your payment!</p>
      </div>
      
      <div style="padding: 30px; background: #f0fdf4;">
        <p style="font-size: 16px; color: #334155;">Dear ${homeownerName},</p>
        
        <p style="color: #64748b; line-height: 1.6;">
          We have successfully received your payment of <strong>₱${amount.toLocaleString()}</strong> 
          on <strong>${paymentDate}</strong>.
        </p>
        
        <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #059669;">
          <h3 style="margin: 0 0 10px 0; color: #1e293b;">Payment Summary</h3>
          <p style="margin: 5px 0; color: #64748b;">Amount Paid: <strong>₱${amount.toLocaleString()}</strong></p>
          <p style="margin: 5px 0; color: #64748b;">Payment Date: <strong>${paymentDate}</strong></p>
          <p style="margin: 5px 0; color: #64748b;">Reference Number: <strong>${referenceNumber}</strong></p>
        </div>
        
        <p style="color: #64748b; font-size: 14px;">
          Your account is now up to date. A receipt has been attached to this email for your records.
        </p>
        
        <p style="color: #64748b; font-size: 14px;">
          Thank you for your prompt payment and for being a valued member of our community.
        </p>
      </div>
      
      <div style="background: #e2e8f0; padding: 20px; text-align: center; color: #64748b; font-size: 12px;">
        <p style="margin: 0;">© 2025 Homeowners Association. All rights reserved.</p>
      </div>
    </div>
  `,

  applicationApproval: (homeownerName: string, blockLot: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #059669, #047857); color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Application Approved</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Welcome to our community!</p>
      </div>
      
      <div style="padding: 30px; background: #f0fdf4;">
        <p style="font-size: 16px; color: #334155;">Dear ${homeownerName},</p>
        
        <p style="color: #64748b; line-height: 1.6;">
          Congratulations! Your homeowner application has been approved. You are now officially a member of our community.
        </p>
        
        <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #059669;">
          <h3 style="margin: 0 0 10px 0; color: #1e293b;">Your Property Details</h3>
          <p style="margin: 5px 0; color: #64748b;">Block/Lot: <strong>${blockLot}</strong></p>
          <p style="margin: 5px 0; color: #64748b;">Status: <strong>Approved</strong></p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Access Your Account
          </a>
        </div>
        
        <p style="color: #64748b; font-size: 14px;">
          You can now log in to your homeowner portal to view your account, make payments, and access community information.
        </p>
      </div>
      
      <div style="background: #e2e8f0; padding: 20px; text-align: center; color: #64748b; font-size: 12px;">
        <p style="margin: 0;">© 2025 Homeowners Association. All rights reserved.</p>
      </div>
    </div>
  `,
}
