const express = require('express');

const novice = express.Router();

// Get access to db stuff
const DB = require('../DB/dbConnection')


novice.get('/', async (req, res, next) => {
    try{
        let queryResult = await DB.allNovice()
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
});

novice.get('/:id', async (req,res,next) => {
    try{
        let queryResult = await DB.oneNovice(req.params.id)
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

novice.post('/', async (req,res,next)=>{
    let title = req.body.title
    let slug = req.body.slug
    let text = req.body.text

    let isAcompleteNovica = title && slug && text && text

    if (isAcompleteNovica) {
        try {
            let queryResult = await DB.createNovice(title,slug,text)
            if (queryResult.affectedRows) {
                console.log("New article added!")
            }
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
    else {
        console.log("A filed is missing!")
    }
    res.end()
})

module.exports = novice;