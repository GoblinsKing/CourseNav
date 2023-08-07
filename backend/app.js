var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var loginRouter = require('./routes/login');
var courseRouter = require('./routes/course');
var adviserRouter = require('./routes/adviser');
var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

var swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./swagger.json');

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/login', loginRouter);
app.use('/course', courseRouter);
app.use('/adviser', adviserRouter);

// MongoDB connection
mongoose.connect('mongodb+srv://MCIPT05:MCIPT05@mcipt05.lajfl.mongodb.net/MCIPT05');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB connection established successfully")
  }
)

module.exports = app;
