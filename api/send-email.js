const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, service_type, material_preference, message } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
  }

  // Create SMTP transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Email content
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #1e3a5f; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">Nova Solicitação de Contato</h1>
        <p style="margin: 10px 0 0;">A Calhas - Joinville/SC</p>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #1e3a5f; border-bottom: 2px solid #ff6b35; padding-bottom: 10px;">Dados do Cliente</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Nome:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">E-mail:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555;">
              <a href="mailto:${email}" style="color: #ff6b35;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Telefone:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555;">
              <a href="https://wa.me/55${phone.replace(/\D/g, '')}" style="color: #ff6b35;">${phone}</a>
            </td>
          </tr>
          ${service_type ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Tipo de Serviço:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555;">${service_type}</td>
          </tr>
          ` : ''}
          ${material_preference ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Preferência de Espessura:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555;">${material_preference}</td>
          </tr>
          ` : ''}
        </table>

        <h2 style="color: #1e3a5f; border-bottom: 2px solid #ff6b35; padding-bottom: 10px; margin-top: 20px;">Mensagem</h2>
        <p style="background-color: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd; color: #333; line-height: 1.6;">
          ${message.replace(/\n/g, '<br>')}
        </p>
      </div>

      <div style="background-color: #1e3a5f; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px;">
        <p style="margin: 0;">Este email foi enviado automaticamente pelo formulário de contato do site A Calhas</p>
      </div>
    </div>
  `;

  const textContent = `
Nova Solicitação de Contato - A Calhas

Dados do Cliente:
- Nome: ${name}
- E-mail: ${email}
- Telefone: ${phone}
${service_type ? `- Tipo de Serviço: ${service_type}` : ''}
${material_preference ? `- Preferência de Espessura: ${material_preference}` : ''}

Mensagem:
${message}

---
Este email foi enviado automaticamente pelo formulário de contato do site A Calhas
  `;

  try {
    // Send email
    await transporter.sendMail({
      from: `"A Calhas - Site" <${process.env.SMTP_USER}>`,
      to: 'contato@acalhas.com.br',
      replyTo: email,
      subject: `Novo Contato: ${name} - ${service_type || 'Solicitação de Orçamento'}`,
      text: textContent,
      html: htmlContent,
    });

    return res.status(200).json({ success: true, message: 'Email enviado com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({ error: 'Erro ao enviar email. Tente novamente.' });
  }
};
