interface EmailData {
  name: string;
  company?: string;
  email: string;
  service?: string;
  message: string;
}

export const sendEmail = async (data: EmailData): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'KaizenSpark Contact Form <onboarding@resend.dev>',
        to: [import.meta.env.VITE_RECIPIENT_EMAIL || 'hr@kaizensparktech.com'],
        subject: `New Contact Form Submission from ${data.name}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                }
                .header {
                  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
                  color: white;
                  padding: 30px;
                  border-radius: 10px 10px 0 0;
                  text-align: center;
                }
                .header h1 {
                  margin: 0;
                  font-size: 24px;
                }
                .content {
                  background: #f8fafc;
                  padding: 30px;
                  border: 1px solid #e2e8f0;
                  border-top: none;
                }
                .field {
                  margin-bottom: 20px;
                  background: white;
                  padding: 15px;
                  border-radius: 8px;
                  border-left: 4px solid #2563eb;
                }
                .field-label {
                  font-weight: 600;
                  color: #475569;
                  font-size: 12px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  margin-bottom: 5px;
                }
                .field-value {
                  color: #1e293b;
                  font-size: 16px;
                }
                .message-box {
                  background: white;
                  padding: 20px;
                  border-radius: 8px;
                  border: 1px solid #e2e8f0;
                  margin-top: 20px;
                }
                .footer {
                  text-align: center;
                  padding: 20px;
                  color: #64748b;
                  font-size: 14px;
                  border-top: 1px solid #e2e8f0;
                }
                .badge {
                  display: inline-block;
                  background: #dbeafe;
                  color: #1e40af;
                  padding: 4px 12px;
                  border-radius: 12px;
                  font-size: 12px;
                  font-weight: 600;
                  margin-top: 5px;
                }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>🚀 New Contact Form Submission</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">KaizenSpark Tech</p>
              </div>
              
              <div class="content">
                <div class="field">
                  <div class="field-label">Full Name</div>
                  <div class="field-value">${data.name}</div>
                </div>
                
                ${data.company ? `
                <div class="field">
                  <div class="field-label">Company</div>
                  <div class="field-value">${data.company}</div>
                </div>
                ` : ''}
                
                <div class="field">
                  <div class="field-label">Email Address</div>
                  <div class="field-value">
                    <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">
                      ${data.email}
                    </a>
                  </div>
                </div>
                
                ${data.service ? `
                <div class="field">
                  <div class="field-label">Service Interested In</div>
                  <div class="field-value">
                    ${data.service}
                    <span class="badge">${data.service}</span>
                  </div>
                </div>
                ` : ''}
                
                <div class="message-box">
                  <div class="field-label">Message</div>
                  <div class="field-value" style="white-space: pre-wrap; margin-top: 10px;">
                    ${data.message}
                  </div>
                </div>
              </div>
              
              <div class="footer">
                <p>This email was sent from the KaizenSpark Tech contact form.</p>
                <p style="margin: 5px 0 0 0;">
                  <strong>Reply to:</strong> 
                  <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">
                    ${data.email}
                  </a>
                </p>
              </div>
            </body>
          </html>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend API Error:', error);
      return { success: false, error: error.message || 'Failed to send email' };
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send email' 
    };
  }
};
