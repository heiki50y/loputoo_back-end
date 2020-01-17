const nodemailer = require('nodemailer');

const sendEmail = async options => {

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 2525,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
  });

  const mailOptions= {
    from: '"Test Server" <test@example.com>',
    to: options.email,
    subject: options.subject,
    text: options.text
  };

  transporter.sendMail(mailOptions);

};

module.exports = sendEmail;
