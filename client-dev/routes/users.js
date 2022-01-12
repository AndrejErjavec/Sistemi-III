const express = require('express')
const users= express.Router()

const DB=require('../DB/dbConn')

users.post('/login',async(req, res)=>{
    let username=req.body.username
    let password=req.body.password

    if(username && password)
    {
        try
        {
            let queryResult= await DB.AuthUser(username)
            if(queryResult.length>0)
            {
                if(password===queryResult[0].user_password)
                {
                     console.log(queryResult)
                     console.log("SESSION VALID")
                }
                else 
                {
                    console.log("Password does not match")
                }

            }
            else 
            {
                console.log("User not registered")
            }
        }
        catch(err)
        {
            console.log(err)
            res.sendStatus(500)
        }

    }
    else
    {
        console.log("Please enter an username and password")
    }
})
//Add user to db
users.post('/register',async(req,res)=>{
    let username=req.body.username
    let password=req.body.password
    let email=req.body.email

    let isValidUser=username && password && email && password
    if(isValidUser)
    {
        try 
        {
            let queryResult= await DB.AddUser(username,email,password)
            if(queryResult.affectedRows)
            {
                console.log("New user added")
            }
        }
        catch (e)
        {
            console.log(e)
            res.sendStatus(500)
        }
    }
    else
    {
        console.log("A field is missing!!")
    }
})


module.exports=users
