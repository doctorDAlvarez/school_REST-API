const express = require('express');
const router = express.Router();
const { User, Course } = require('../models');
const { authenticateUser } = require('../middleware/auth');
const { errorHelper } = require('../middleware/errorHelper');

//User authenticate route
router.get('/users', authenticateUser, errorHelper(async (req, res, next) =>{
   //return authenticated user. 200OK
   const user = req.currentUser;
   res.json({
       name: user.firstName,
       username: user.emailAddress
   });
}));

//create new user route.
router.post('/users', errorHelper(async (req, res) => {
    try {
        await User.create(req.body);
        res.status(201).location('/').end();
    } catch(error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }
    //add location header to '/'
    //return status 201 and no content. end. 201 created
}));

//all Courses Route
router.get('/courses', errorHelper(async (req, res, next) => {
    const courses = await Course.findAll({ include: [{
        model: User,
        attributes: ['firstName', 'lastName', 'emailAddress'],
    }]});
    res.json(courses);
    //returns a list of all courses including de user that owns each one. 200 OK
}));

//course reader route
router.get('/courses/:id', errorHelper(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id, {
        include: [{
            model: User,
            attributes: ['firstName', 'lastName', 'emailAddress'],
        }]
    });
    res.json(course);
    //returns the course and the corresponding owner. 200OK
}));

//course create route
router.post('/courses', authenticateUser, errorHelper(async (req, res, next) => {
    try {
        const user = req.currentUser;
        const newCourse = await Course.create({...req.body, userId: user.id});
        //create a new course.
        res.status(201).location(`/api/courses/${newCourse.id}`).end();
        //set the location header to URI of the new course
        //201 and end.
    } catch(error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }
}));

//course update route
router.put('/courses/:id', authenticateUser, errorHelper(async (req, res, next) => {
    //update the id and return 204 with end.
    const course = await Course.findByPk(req.params.id);
    await course.update(req.body);
    res.json(course);
}));

//course delete route
router.delete('/courses/:id', authenticateUser, errorHelper(async (req, res, next) => {
    //delete the id and return 204 with end.
    const course = await Course.findByPk(req.params.id);
    await course.destroy();
    res.status(204).end();
}));

//user account delete
router.delete('/users/:id', authenticateUser, errorHelper(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.status(204).end();
}));





module.exports = router;