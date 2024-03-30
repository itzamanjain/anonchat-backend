import jwt from 'jsonwebtoken'
import User from '../../models/user.model'
import bcrypt from 'bcrypt'


export default login = async(req,res) =>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        res.status(404).json({message:"account not found!"})
    }

    const passwordMatched = await bcrypt.compare(password,user.password);

    
    if(passwordMatched){
        const token = jwt.sign({email},process.env.JWT_SECRET);
        res.status(200).json({
            token :token,
            message:"logged In",user
        });
    }else{
        res.status(401).json({message:"login failed Password or email doesn't match!"})
    }
}