const nodemailer = require('nodemailer');

module.exports = (ownerEmail, giver, receiver) => {
    const mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'seu email',
            pass: 'seu password',
        }
    });
    
    const mailOptions = {
        from: ownerEmail,
        to: [giver.email],
        subject: '{Dev} Oculto - Seu amigo oculto.',
        text: `Seu amigo oculto é o(a) ${receiver.name}`,
    };
      
    return mail.sendMail(mailOptions).promise();
}
  