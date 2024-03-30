import User from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import z from "zod";
import dotenv from "dotenv";

const  register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const userExists = await User.findOne({ username: username });

    if (userExists) {
      return res.json({
        message: "username already taken",
      });
    }

    const usernameSchema = z.string().max(13).min(3);

    const emailSchema = z
      .string()
      .email()
      .refine((email) => email.endsWith(".ac.in") || email.endsWith(".edu"), {
        message: "You must signup with your college email",
      });

      const passwordSchema = z.string().min(8)

      const usernameValidationResult = usernameSchema.safeParse(username)
    const emailValidationResult = emailSchema.safeParse(email)
    const passwordValidationResult = passwordSchema.safeParse(password)

    if (!usernameValidationResult.success) {
        const message = usernameValidationResult.error.issues[0].message.split(
          'g',
        )[1]
        const finalMessage = 'username' + message
        return res.json({
          message: finalMessage,
        })
      }

      if(!emailValidationResult.success){
        if(emailValidationResult.error.issues && emailValidationResult.error.issues.length >0){
            return res.status(403).json({
                message:emailValidationResult.error.issues[0].message
            })
        }else{
            return res.status(403).json({
                message:"Invalid email!!"
            })
        }
      }

      if(!passwordValidationResult.success){
        return res.status(403).json({
            message:'password must be of length 8 char!'
        })
      }

      const hashedPassword = await bcrypt.hash(password,10)
      const verificationCode = Math.floor(1000+Math.random()*9000)

      const organization = email.split('@')[1].split('.')[0]

      const newUser = new User({
        email,
        username,
        password,
        verificationCode,
        college:organization,
      })

      const savedUser = await newUser.save()

      const token = jwt.sign({
        email:savedUser.email
      },
        process.env.JWT_SECRET,
      )

      sendEmail(email,verificationCode)

      res.status(201).json({
        token:token,
        message:'account created!',
    })
  } catch (error) {
    console.log(error?.message || "Registration Failed");
  }
};  

export default register;