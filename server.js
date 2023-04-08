// wiki.js - Wiki route module
const express = require('express');

const app = express();

app.use(express.json());

const housingRoute = require('./routes/housingRoute');
const userRoute = require('./routes/userRoute');
const agencyRoute = require('./routes/agencyRoute');
const agentRoute = require('./routes/agentRoute');
const appointmentRoute = require('./routes/appointmentRoute');
const likesRoute = require('./routes/likesRoute');
const photosRoute = require('./routes/photosRoute');

app.use('/housing',housingRoute);
app.use('/user',userRoute);
app.use('/agency',agencyRoute);
app.use('/agent',agentRoute);
app.use('/appointment',appointmentRoute);
app.use('/likes',likesRoute);
app.use('/photos',photosRoute);


app.listen(8000,function(){
  console.log("Live at Port 8000");
});


module.exports = app;