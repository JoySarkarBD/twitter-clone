//dependencies
const createHttpError = require("http-errors");
const nodemailer = require("nodemailer");
require("dotenv").config();

//create nodemailer function
const sendemail = async (receiver, data, cb) => {
  try {
    //transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PWD,
      },
    });

    //options
    const options = {
      from: process.env.APP_EMAIL,
      to: receiver.join(","),
      subject: data.subject,
      html: data.template,
      attachment: data.attachment,
    };

    //send email via transporter
    transporter.sendMail(options, cb);
  } catch (error) {
    next(createHttpError(500, "Internal server error"));
  }
};

//export  send email function
module.exports = sendemail;
