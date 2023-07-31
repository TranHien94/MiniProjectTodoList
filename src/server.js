
import express from 'express'
const server = express()

import dotenv from 'dotenv'
dotenv.config()

import viewConfig from '../views'
server.use('/view', viewConfig)

import bodyParser from 'body-parser'
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

import cors from 'cors'
server.use(cors())
import todosRouter from '../routes/api/todos';
server.use('/api/todos', todosRouter);

server.listen(process.env.SERVER_PORT, ()=>{
    console.log(`server running on port ${process.env.SERVER_HOST}: ${process.env.SERVER_PORT}`);
})
