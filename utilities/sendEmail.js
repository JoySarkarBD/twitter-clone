// dependencies
const createHttpError = require("http-errors");
const nodeMailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (receivers, data, cb) => {
  try {
    // sending mail
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PWD,
      },
    });
    //options
    const options = {
      from: process.env.EMAIL,
      to: receivers.join(","),
      subject: data.subject,
      html: data.template,
      attachments: data.attachments,
    };
    transporter.sendMail(options, cb);
  } catch (error) {
    next(createHttpError("Internal server error!"));
  }
};

module.exports = sendEmail;
