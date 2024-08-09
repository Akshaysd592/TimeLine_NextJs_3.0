import VerificationEmail from "../../emails/VerificationEmailTemplate"
import nodemailer from 'nodemailer'

interface emailParams{
  email :string;
  username : string;
  verifyCode:string;
}

export const mailSender = async ( {email, username,verifyCode} : emailParams) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    })

    let htmlcontent = VerificationEmail({username,otp:verifyCode})
    console.log(htmlcontent);

    let info = await transporter.sendMail({
      from: `" GetLine" <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: "Getline | Verification Email", // Subject line
      html: `Html lang="eng" dir="ltr">
            <Head>
                <title>Verification Code</title>
                <Font
                fontFamily="Roboto"
                fallbackFontFamily="Verdana"
                webFont={{
                    url:'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                    format:'woff2'
                }}
                fontWeight={400}
                fontStyle="normal"
                >

                </Font>
            </Head>
            <Preview>
                Here's Your Verification code :
            </Preview>
            <Section>
                <Row>
                    <Heading as="h2">Hello ${username}</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for registering , Please use the following verification code to complete your registration
                    </Text>
                </Row>
                <Row>
                    <Text>${verifyCode}</Text>
                </Row>
                <Row>
                    If you did not request this code , Please ignore this email
                </Row>
            </Section>
            

        </Html>`, // html body
    })
    console.log(info)
    return info
  } catch (error:any) {
    console.log(error.message)
    return error.message
  }
}


