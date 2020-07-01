const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const multer = require('multer');
const buffer = require('buffer/').Buffer
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
});
const{
    Messages,
    createResponse
}=require('./config/config')

const {
    isFileFormatCorrect,
    validateTransaction
} = require('./src/validateTransaction')
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
require('dotenv').config();



app.post('/validateTransaction', upload.single('file'), async (req, res) => {

    try {
        if (isFileFormatCorrect(req.file)) {
            let csvString=  req.file.buffer.toString('utf8')
            let response=await validateTransaction(csvString);
            res.send(response);


        } else {
            res.status(206).send(createResponse(Messages.fileFormat,{}));
        }
    } catch (error) {
        console.log(error);
        
    }



})

module.exports=app;