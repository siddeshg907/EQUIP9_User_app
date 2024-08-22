const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const cors=require("cors")
require("dotenv").config()

const path=require("path")



const __dirname=path.resolve()




const app=express()
app.use(express.json())

app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).send({"msg":"This is Hompe Page"})
})

app.use("/api/users",userRouter)



app.listen(3000,async()=>{
    try {
        await connection
        console.log("Connected to the DB")
        console.log(`server is running on 3000`)
    } catch (error) {
        console.log(error)
    }
    
})


app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  })