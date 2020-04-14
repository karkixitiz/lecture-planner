'use strict';

/**
 * Seed model data to database
 */

var mongoose = require('mongoose'),
    Lecture = require('../models/lecture');

mongoose.connect('mongodb://localhost/LecturePlannerDB',{ useNewUrlParser: true });

var lecture = [{
    subject: 'APM',
    date:'2018.09.01',
    time: '10.30'
},
    {
        subject: 'C++',
        date:'2018.09.02',
        time: '14.45'
    },
    {
        subject: 'Advance cryptography',
        date:'2018.09.03',
        time: '16.00'
    },
    {
        subject: 'Modern Web Development',
        date:'2018.09.04',
        time: '8.45'
    },
    {
        subject: 'Germany language A2',
        date:'2018.09.05',
        time: '13.15'
    }]

Lecture.create(lecture, function(err, lecture) {
    console.log('Lecture timing seeded to DB');
    process.exit(0);
});
