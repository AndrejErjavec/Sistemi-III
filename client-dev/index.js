const express=require('express')
require('dotenv').config()
const app=express()
const port=5001

//Configs
app.use(express.json())

//My custom routes
const novice =require('./routes/novice')
const users=require('./routes/users')

//when client visits home
app.get('/', (req,res)=>{
    res.send("Hola")
    res.end()  
})

app.use('/novice',novice)
app.use('/users', users)

app.listen( process.env.PORT || port,()=>{
    console.log(`Server is running on port: ${process.env.PORT || port}`)
})