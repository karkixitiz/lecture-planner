import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors())

const server = http.Server(app)
server.listen(3000)
console.log('listening on :3000')
