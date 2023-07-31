import express from "express";
const router = express.Router()

import path from 'path'

router.get('/home', (req, res) => {
    res.render(path.join(__dirname, 'templates/home.ejs'),
        {
            HelloWorld: 'Hello World'
        })
})
module.exports = router


