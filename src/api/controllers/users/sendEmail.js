import nodemailer from 'nodemailer'

const sendEmail = async(email,verificationCode) =>{
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'jainaman0744@gmail.com',
            pass:process.env.E_SECRET
        },
    })

    await transporter.sendMail({
        from :'jainaman0744@gmail.com',
        to:email,
        subject:'Email Verification ',
        text:`your verification code is ${verificationCode}`
    })
}

export {sendEmail}