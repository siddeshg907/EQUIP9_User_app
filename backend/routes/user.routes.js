import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../model/user.model.js';
import { auth } from '../middlewares/auth.middleware.js';
import { upload, bucket } from '../config/firebaseConfig.js';
import dotenv from 'dotenv';

dotenv.config();

const userRouter=express.Router()

userRouter.post("/register", upload.single('avatar'), async (req, res) => {
    const { firstName, lastName, mobile, pass } = req.body;

    if (!req.file) {
        return res.status(400).json({ msg: "No file uploaded" });
    }

    try {
        const fileName = Date.now().toString() + '-' + req.file.originalname;
        const blob = bucket.file(fileName);

        await blob.save(req.file.buffer, {
            metadata: { contentType: req.file.mimetype },
        });

        const avatar = https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media;

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


export { userRouter };
