const express=require('express')
const novice= express.Router()

//import db moduel
const DB=require('../DB/dbConn')

novice.get('/', async (req,res,next)=>{
    try
    {
        let queryResult= await DB.allNovice()
        res.json(queryResult)
    }
    catch(err)
    {
        console.log(err)
        res.sendStatus(500)
    }
})

novice.get('/:id',async (req,res,next)=>{
    try
    {
        let queryResult= await DB.oneNovica(req.params.id)
        res.json(queryResult)
    }
    catch(err)
    {
        console.log(err)
        res.sendStatus(500)
    }
})


novice.post('/', async (req,res)=>{
    let title= req.body.title
    let slug= req.body.slug
    let text = req.body.text

    let isAcompleteArticle= title && slug && text

    if(isAcompleteArticle)
    {
        try
        {
            let queryResult= await DB.createNovica(title,slug,text)
            if(queryResult.affectedRows)
            {
                console.log("New article added")
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
        console.log("A field is missing...")
    }
    res.end()
})

module.exports=novice