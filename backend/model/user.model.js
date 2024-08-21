const mongoose=require("mongoose")

const userSchema= mongoose.Schema({
    firstName:String,
    lastName:String,
    mobile:String,
    pass:String,
    avatar:String
},{
    versionKey:false
})

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}