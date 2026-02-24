const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendResetEmail = async (to, token) => {
    const link = `http://localhost:5173/reset-password?token=${token}`;

    console.log('Intentando enviar email a:', to);
    console.log('EMAIL_USER cargado:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS cargado:', process.env.EMAIL_PASS ? 'SI' : 'NO');

    const info = await transporter.sendMail({
        from: `"ShirtFinder" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Recuperar contraseña - ShirtFinder',
        html: `
            <div style="font-family: Inter, sans-serif; max-width: 500px; margin: auto; padding: 30px;">
                <h2 style="color: #233A5B;">Recuperar contraseña</h2>
                <p style="color: #555555;">Haz clic en el botón para restablecer tu contraseña. Caduca en 1 hora.</p>
                <a href="${link}" style="display:inline-block; background:#FF6B35; color:#fff; padding:12px 28px; border-radius:12px; text-decoration:none; font-weight:bold; margin-top:16px;">
                    Restablecer contraseña
                </a>
            </div>
        `
    });

    console.log('Email enviado OK, messageId:', info.messageId);
};

module.exports = { sendResetEmail };
