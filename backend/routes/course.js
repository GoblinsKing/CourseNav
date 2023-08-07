var express = require('express');
var router = express.Router();
const courseModel = require('../models/courseModel');
const dependencyModel = require('../models/dependencyModel');
const gradeModel = require('../models/gradeModel');
var jwt = require('jsonwebtoken');
const SECRET_KEY = 'MCIP05_secret_key'

//give the course code and return the course infomation
router.post('/', function(req, res, next) {
    const authorization = req.get('token');
    try {
        jwt.verify(authorization, SECRET_KEY);
    }
    catch(err) {
        return res.status(401).send({error: 'Invalid Token'});
    }
    if(!req.body.courseCode){
        res.status(400);
        res.json({message: "Bad request"});
    }
    var courseCode = req.body.courseCode;

    //search the courses base on the course code
    courseModel.findOne({CODE: courseCode}, function (err, data) {
        if (err) return handleError(err);
        res.send({message: 'OK', data: data});
    });
});

router.get('/courseList', function(req, res, next){
    courseModel.find({} , function (err, result) {
        if (err) throw err;
        const courses = [];
        for (let i = 0; i < result.length; i++) {
            courses[i] = 'COMP SCI ' + result[i].CODE + ' ' + result[i].NAME;
        }
        res.send({message: 'OK', data: courses});
    });
})

/* //give the course and return the prerequisite
router.post('/prerequisite', function(req, res, next) {
    if(!req.body.courseCode){
        res.status(400);
        res.json({message: "Bad request"});
    }
    var courseCode = req.body.courseCode;
    dependencyModel.find({CODE: courseCode}, function (err, data) {
        if (err) return handleError(err);
        res.send({message: 'OK', data: data});
    });
    //res.send({result:data});
}); */

async function cheakGrade(courseCode) {
    try {
        let data = await gradeModel.find({CODE: courseCode}).exec();
        let courseData = await courseModel.findOne({CODE: courseCode}).exec();
        let totalNum = HDNum = DNum = CNum = PNum = FNum = 0;
        for (let i = 0; i < data.length; i++) {
            const elem = data[i];
            totalNum +=1 ;
            if (elem.GRADE == "HD") HDNum++;
            else if (elem.GRADE == "D") DNum++;
            else if (elem.GRADE == "C") CNum++;
            else if (elem.GRADE == "P") PNum++;
            else if (elem.GRADE == "F") FNum++;
        }
        return [courseData.NAME, HDNum/totalNum, DNum/totalNum, CNum/totalNum, PNum/totalNum, FNum/totalNum];
    }
    catch (err) {
        err.stack;
    }
}
 
async function cheakPrerequisiteGrade(courseCode) {
    try {
        let data = await dependencyModel.find({CODE: courseCode}).exec();
        let result = [];
        for (let i = 0; i < data.length; i++) {
            let currPrerequisite = [];
            currPrerequisite.push(data[i].PREREQUISITE_CODE);
            currPrerequisite.push(await cheakGrade(data[i].PREREQUISITE_CODE));
            result.push(currPrerequisite);
        }
        return result;
    }
    catch (err) {
        err.stack;
    }
}

async function cheakDependencyGrade(courseCode, requiredGrades) {
    try {
        let data = await dependencyModel.find({PREREQUISITE_CODE: courseCode}).exec();
        let result = [];
        for (let i = 0; i < data.length; i++) {
            let currDependency = [];
            currDependency.push(data[i].CODE);
            if (!requiredGrades) {
                currDependency.push(await cheakGrade(data[i].CODE));
            }
            else {
                currDependency.push(await findcCourseRelationship(courseCode, data[i].CODE, requiredGrades));
            }
            result.push(currDependency);
        }
        return result;
    }
    catch (err) {
        err.stack;
    }
}

//give the course and return the grade
router.post('/grade', async function(req, res, next) {
    const authorization = req.get('token');
    try {
        jwt.verify(authorization, SECRET_KEY);
    }
    catch(err) {
        return res.status(401).send({error: 'Invalid Token'});
    }
    if(!req.body.courseCode){
        res.status(400);
        res.json({message: "Bad request"});
    }
    var courseCode = req.body.courseCode;
    res.send({message: 'OK', overallGradeDistribution: await cheakGrade(courseCode), prerequisiteData: await cheakPrerequisiteGrade(courseCode)});
});

//give the course and return the dependency grade
router.post('/dependencyGrade', async function(req, res, next) {
    const authorization = req.get('token');
    try {
        jwt.verify(authorization, SECRET_KEY);
    }
    catch(err) {
        return res.status(401).send({error: 'Invalid Token'});
    }
    if(!req.body.courseCode){
        res.status(400);
        res.json({message: "Bad request"});
    }
    var courseCode = req.body.courseCode;
    let requiredGrades = req.body.requiredGrades;
    res.send({message: 'OK', overallGradeDistribution: await cheakGrade(courseCode), dependencyData: await cheakDependencyGrade(courseCode, requiredGrades)});
});

async function findRelatedData(relatedCourse, requiredGrades) {
    if (!requiredGrades) {
        return await gradeModel.find({CODE: relatedCourse}).select({SCODE:1}).lean().exec();
    }
    else {
        return await gradeModel.find({CODE: relatedCourse, GRADE: {$in: requiredGrades}}).select({SCODE:1}).lean().exec();
    }
}

async function findcCourseRelationship(mainCourse, relatedCourse, requiredGrades) {
    let mainData = await gradeModel.find({CODE: mainCourse}).select({SCODE:1, GRADE:1}).lean().exec();
    let relatedData = await findRelatedData(relatedCourse, requiredGrades);
    let relatedCourseName = await courseModel.findOne({CODE: relatedCourse}).select({NAME:1}).lean().exec();
    let studentDict = {};
    let totalNum = HDNum = DNum = CNum = PNum = FNum = 0;

    for (let j = 0; j < relatedData.length; j++) {
        studentDict[relatedData[j].SCODE] = 1;
    }

    for (let i = 0; i < mainData.length; i++) {
        let mainElem = mainData[i];
        if (mainElem.SCODE in studentDict) {
            totalNum +=1 ;
            if (mainElem.GRADE == "HD") HDNum++;
            else if (mainElem.GRADE == "D") DNum++;
            else if (mainElem.GRADE == "C") CNum++;
            else if (mainElem.GRADE == "P") PNum++;
            else if (mainElem.GRADE == "F") FNum++;
        }
    }
    return [relatedCourseName.NAME, HDNum/totalNum, DNum/totalNum, CNum/totalNum, PNum/totalNum, FNum/totalNum];
}

//give the main course and related course then return the grade relationship
router.post('/courseRelationship', async function(req, res, next) {
    const authorization = req.get('token');
    try {
        jwt.verify(authorization, SECRET_KEY);
    }
    catch(err) {
        return res.status(401).send({error: 'Invalid Token'});
    }
    if(!req.body.mainCourse || !req.body.relatedCourse){
        return res
            .status(400)
            .send({error: 'Bad request'});
    }
    let mainCourse = req.body.mainCourse;
    let relatedCourse = req.body.relatedCourse;
    let requiredGrades = req.body.requiredGrades;
    
    res.send({message: "ok", retust: await findcCourseRelationship(mainCourse, relatedCourse, requiredGrades)});
});

module.exports = router;
