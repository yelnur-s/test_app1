const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://127.0.0.1:27017/test_app");

const app = express();
app.set('port', 5000);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));


app.use(require("./server/routes"));


app.listen(app.get('port'), ()=>console.log("Server litning on port "+app.get('port')));
