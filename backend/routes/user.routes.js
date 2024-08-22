const express=require("express")
const bcrypt=require("bcrypt")
require("dotenv").config()
const {UserModel}=require("../model/user.model")
const  jwt=require("jsonwebtoken")
const { auth } = require("../middlewares/auth.middleware")
const { upload, bucket } = require("../config/firebaseConfig")

const userRouter=express.Router()

userRouter.post("/register", upload.single('avatar'), async (req, res) => {
    const { firstName, lastName, mobile, pass } = req.body;

    if (!req.file) {
        return res.status(400).json({ msg: "No file uploaded" });
    }

     // Check if the mobile number already exists
  const existingUser = await UserModel.findOne({ mobile });

  if (existingUser) {
    return res.status(400).json({ msg: 'Mobile number already registered' });
  }

    try {
        const fileName = Date.now().toString() + '-' + req.file.originalname;
        const blob = bucket.file(fileName);

        await blob.save(req.file.buffer, {
            metadata: { contentType: req.file.mimetype },
        });

        const avatar = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;

        const hashedPassword = await bcrypt.hash(pass, 5);
        const user = new UserModel({ firstName, lastName, mobile, pass: hashedPassword, avatar });
        await user.save();

        res.status(200).json({ msg: "A new user registered successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


userRouter.post("/login",async(req,res)=>{
    const {mobile,pass}=req.body
    const user=await UserModel.findOne({mobile})
    try {
      bcrypt.compare(pass,user.pass,async(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user._id,mobile:user.mobile},process.env.key)
                    res.status(200).json({msg:"Login Successfully!",token,userId:user._id})
                }else{
                    res.status(200).json({msg:"wrong credentials"})
                }
            })    
       
    } catch (error) {
        res.status(400).json({error:error})
    }
})

userRouter.get("/me", auth, async (req, res) => {
    try {
        const userId = req.user.userID; // Extract user ID from the JWT token
        const user = await UserModel.findById(userId).select('-pass'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports={
    userRouter
}