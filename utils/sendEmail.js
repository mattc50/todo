import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const sendEmail = async (email, subject, attachments, payload, template) => {
  if (attachments.length > 0) {
    if (attachments[0].cid === 'welcome-email') {
      const imageUrl = path.resolve(__dirname, 'images/welcome-email.png');
      const imageBase64 = fs.readFileSync(imageUrl, { encoding: "base64" })
      const dataUrl = "data:image/png;base64," + imageBase64;
      attachments[0].path = dataUrl;
    }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = Handlebars.compile(source);
    const options = () => {
      return {
        from: `Toto<${process.env.FROM_EMAIL}>`,
        to: email,
        subject: subject,
        attachments: attachments,
        html: compiledTemplate(payload)
      };
    };

    transporter.sendMail(options(), (error) => {
      if (error) {
        console.log(error)
        return error;
      } else {
        return res.status(StatusCodes.OK).json({ success: true })
      }
    })
  } catch (error) {
    return error;
  }
}

export default sendEmail;
