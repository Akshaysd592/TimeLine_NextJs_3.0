import VerificationEmail from "../../emails/VerificationEmailTemplate"

const nodemailer = require('nodemailer')

export const mailSender = async ( email: string,
  username:string,
  verifyCode: string,) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    })

    let info = await transporter.sendMail({
      from: `" GetLine" <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: "Getline | Verification Email", // Subject line
      html: VerificationEmail({username,otp:verifyCode}), // html body
    })
    console.log(info.response)
    return info
  } catch (error:any) {
    console.log(error.message)
    return error.message
  }
}


