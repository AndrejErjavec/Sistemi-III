const express = require('express')
const users = express.Router()

const DB = require('../DB/dbConnection')

users.post('/login', async (req,res,next)=>{
  let username = req.body.username
  let password = req.body.password

  if (username && password) {
    try {
      let queryResult = await DB.AuthUser(username)
      if (queryResult.length > 0) {
        if (password === queryResult[0].user_password) {
          console.log(queryResult)
          console.log("SESSION IS VALID")
        }
        else {
          console.log("Incorrect password!")
        }
      }
      else {
        cosnole.log(`User ${username} is not registered!`)
      }
    }
    catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  }
  else {
    console.log("Please enter user and password!")
  }
  res.end()
})

// Method to insert user in our db
users.post('/register', async (req,res)=>{
  let username = req.body.username
  let password = req.body.password
  let email = req.body.email

  let isCompleteUSer = username && password && email

  if (isCompleteUSer) {
    try {
      let queryResult = await DB.AddUser(username,email,password)
      if (queryResult.affectedRows) {
        console.log("new user added")
      }
    }
    catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  }
  else {
    console.log("A field is missing")
  }
  res.end()
})

module.exports=users