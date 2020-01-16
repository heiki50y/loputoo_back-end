const nodemailer = require('nodemailer');

const sendEmail = async options => {

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "b29f647d4694ae",
        pass: "a94f4b71a4e20d"
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

//   transporter.sendMail(mailOptions, (err, info) => {
//     if(err){
//         console.log(err);
//         return next(err);
//     }
//     console.log("Info: ", info);
//     res.json({
//       message: "Email successfully sent."
//     });
// });