//require all express componentas
const express = require('express');
const bodyPase = require('body-parser');

//make express app
const app = express();

//set index.html in main page
app.use(express.static('webpage'));
app.use(express.static('uploads'));

//convert body data to useable json
app.use(bodyPase.json());


// define api link with js file
app.use('/apiserver',require('./manager/api'));

//make a port in number 4000
app.listen(process.env.port || 4000,function(){
    console.log('now listning for reqest');
});