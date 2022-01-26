const express=require('express')
require('dotenv').config()
const cors=require('cors')
const cookieParser= require('cookie-parser')
const session= require('express-session')
const path = require('path')


const app=express()
const port=5056

const DB=require('./DB/dbConn')



//Configs
app.use(express.static("../client-dev/build"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:['http://88.200.63.148:3056'],
    methods:['GET','POST',"OPTIONS", "HEAD"],
    credentials:true
}))
app.use(cookieParser("somescret"))
app.use(session({
    key:"userID",
    secret:"somescret",
    saveUninitialized:true,
    resave:false,
    cookie:{
        expires:60*2,sameSite:false}
}))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, "../clinet-dev/build", "index.html"))
    res.end()
})

//My custom routes
const novice =require('./routes/novice')
const users=require('./routes/users')

app.use('/novice',novice)
app.use('/users',users)


app.listen( process.env.PORT || port,()=>{
    console.log(`Server is running on port: ${process.env.PORT || port}`)
})
