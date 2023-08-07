var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const SECRET_KEY = 'MCIP05_secret_key'
const dependencyModel = require('../models/dependencyModel');
const gradeModel = require('../models/gradeModel');
const courseModel = require('../models/courseModel');

var allNodes = [];
var allLinks = [];
var nodesCodeDict = {};

async function findRelatedData(relatedCourse, requiredGrades) {
    if (!requiredGrades) {
        return await gradeModel.find({CODE: relatedCourse}).select({SCODE:1}).lean().exec();
    }
    else {
        return await gradeModel.find({CODE: relatedCourse, GRADE: requiredGrades}).select({SCODE:1}).lean().exec();
    }
}

async function findcCourseRelationship(mainCourse, relatedCourse, requiredGrades) {
    let mainData = await gradeModel.find({CODE: mainCourse}).select({SCODE:1, GRADE:1}).lean().exec();
    let relatedData = await findRelatedData(relatedCourse, requiredGrades);
    let studentDict = {};
    let totalNum = HDNum = DNum = CNum = PNum = FNum = 0;
    let predictedResult;
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
    if (HDNum >= DNum && HDNum >= CNum && HDNum >= PNum && HDNum >= FNum && HDNum != 0) {
        predictedResult = "HD";
    }
    else if (DNum >= HDNum && DNum >= CNum && DNum >= PNum && DNum >= FNum && DNum != 0) {
        predictedResult = "D";
    }
    else if (CNum >= HDNum && CNum >= DNum && CNum >= PNum && CNum >= FNum && CNum != 0) {
        predictedResult = "C";
    }
    else if (PNum >= HDNum && PNum >= CNum && PNum >= DNum && PNum >= FNum && PNum != 0) {
        predictedResult = "P";
    }
    else if (FNum >= HDNum && FNum >= CNum && FNum >= PNum && FNum >= DNum && FNum != 0) {
        predictedResult = "F";
    }
    else {
        predictedResult = null;
    }
    return {prediction: [HDNum/totalNum, DNum/totalNum, CNum/totalNum, PNum/totalNum, FNum/totalNum], predictedResult: predictedResult};
}

async function getAdviser(courseInfoList) {
    let allDependencyData;
    let currLink = {};
    let currNode = {};
    let nextLayer = [];
    let predictedResult;
    for (let i = 0; i < courseInfoList.length; i++) {
        if (!(courseInfoList[i].code in nodesCodeDict)){
            currNode = {};
            currNode.id = courseInfoList[i].code;
            let courseData = await courseModel.findOne({CODE: currNode.id}).select({NAME:1}).lean().exec();
            currNode.name = courseData.NAME;
            currNode.isInput = true;
            allNodes.push(currNode);
            nodesCodeDict[currNode.id] = 1;
        }
        allDependencyData = await dependencyModel.find({PREREQUISITE_CODE: courseInfoList[i].code}).select({CODE:1}).lean().exec();
        for (let j = 0; j < allDependencyData.length; j++) {
            if (!(allDependencyData[j].CODE in nodesCodeDict)){
                currNode = {};
                currNode.id = allDependencyData[j].CODE;
                let courseData = await courseModel.findOne({CODE: currNode.id}).select({NAME:1}).lean().exec();
                currNode.name = courseData.NAME;
                let notInNodes = true;
                for (let k = 0; k < courseInfoList.length; k++) {
                    if (currNode.id == courseInfoList[k].code){
                        notInNodes = false;
                    }
                }
                if (! notInNodes){
                    currNode.isInput = true;
                }
                else{
                    currNode.isInput = false;
                    //gragrade Predictiondes
                    let gradePrediction = await findcCourseRelationship(courseInfoList[i].code, allDependencyData[j].CODE, courseInfoList[i].grade);
                    currNode.gradePrediction = gradePrediction.prediction;
                    predictedResult = gradePrediction.predictedResult;
                    nextLayer.push({code: currNode.id, grade: predictedResult});
                }
                allNodes.push(currNode);
                nodesCodeDict[currNode.id] = 1;
            }
            currLink = {};
            currLink.source = courseInfoList[i].code;
            currLink.target = allDependencyData[j].CODE;
            allLinks.push(currLink);
        }
    }
    return {nextLayer: nextLayer};
}

//give the course info and return the course advise
router.post('/', async function(req, res, next) {
    const authorization = req.get('token');
    try {
        jwt.verify(authorization, SECRET_KEY);
    }
    catch(err) {
        return res.status(401).send({error: 'Invalid Token'});
    }
    if(!req.body.courseInfoList){
        res.status(400);
        res.json({message: "Bad request"});
    }
    let courseInfoList = req.body.courseInfoList;
    
    // The first layer
    let result = await getAdviser(courseInfoList);

    // The second layer
    result = await getAdviser(result.nextLayer);

    // The third layer
    result = await getAdviser(result.nextLayer);
    
    res.send({message: 'OK', nodes: allNodes, links: allLinks});
    //clear the result array
    allNodes = [];
    allLinks = [];
    nodesCodeDict = {};
});

module.exports = router;