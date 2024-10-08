import mongoose from 'mongoose';

const userSchema= mongoose.Schema({
    firstName:String,
    lastName:String,
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    pass:String,
    avatar:String
},{
    versionKey:false
})

const UserModel=mongoose.model("user",userSchema)

export { UserModel };