import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import scrapeCtrl from './scrapeCtrl'
import userCtrl from './controllers/user'
import lectureCtrl from './controllers/lecture'


const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://localhost/LecturePlannerDB',{ useNewUrlParser: true, useUnifiedTopology: true,})

const server = http.Server(app)

/** Route plan -- START */
app.post('/route-plan', scrapeCtrl.getRoutePlan)
app.get('/route-suggestions/:keyword', scrapeCtrl.locationSuggestions)
/** Route plan -- END */

app.get('/user-details',userCtrl.getUserAddresses)
app.post('/user-details',userCtrl.setUserAddresses)
app.get('/lecture-details',lectureCtrl.getLectureDetails)

app.get('/universities',function(req,res){
    res.json({
        status:'success',
        data:{
            'Kiel Fachhochschule': 'Fachhochschule Kiel',
            'Kiel Universität': 'Christian Albrechts University, Kiel',
            'Kiel, Post, Knooper Weg': 'Muthesius Kunsthochschule, Kiel'
        }
    })
})

server.listen(3000)
console.log('listening on :3000')
