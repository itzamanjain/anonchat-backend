import User from '../../models/user.model.js'

const verifyUser = async(req,res) =>{
    try {
        const codeFromFrontend = req.body.verificationCode.toString()
        const userDetails = await User.findOne({email:req.user.email})

        if(codeFromFrontend===userDetails.verificationCode.toString()){
            res.json({
                message:"user verified "
            })
        }
        else{
            res.status(403).json({
                message:'incoorect code'
            })
        }

    } catch (error) {
        res.status(500).send("Error While Verifying User : " + error )
    }
}

export default verifyUser