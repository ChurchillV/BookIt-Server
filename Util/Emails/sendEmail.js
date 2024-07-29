const transporter = require("../../Config/email");

const sendEmail = (emailType) => {
    transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

    transporter.sendMail(emailType, function(error, info) {
        if(error) {
            console.log(error);
        } else {
            console.log("Email sent: ",  info.response);
        }
    })
}

module.exports = sendEmail;