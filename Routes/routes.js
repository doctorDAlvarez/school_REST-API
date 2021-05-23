const express = require('express');
const router = express.Router();

//User routes
router.get('/users', (req, res, next) =>{
   //return authenticated user. 200OK
});

router.post('/users', (req, res, next) => {
    //create new user
    //add location header to '/'
    //return status 201 and no content. end. 201 created
});

//Course Routes
router.get('/courses', (req, res, next) => {
    //returns a list of all courses including de user that owns each one. 200 OK
});

router.get('/courses/:id', (req, res, next) => {
    //returns the course and the corresponding owner. 200OK
});

router.post('/courses', (req, res, next) => {
    //create a new course.
    //set the location header to URI of the new course
    //201 and end.
});

router.put('/courses/:id', (req, res, next) => {
    //update the id and return 204 with end.
});

router.delete('/courses:id', (req, res, next) => {
    //delete the id and return 204 with end.
});





module.exports = router;