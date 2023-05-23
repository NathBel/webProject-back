// wiki.js - Wiki route module
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const compression = require('compression');
const rateLimit = require('express-rate-limit')
const cors = require('cors');

const port = process.env.PORT || 5000;

const app = express();

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 1000, // Limit each IP to 1000 requests per `window` (here, per 10 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(express.json());
//log all requests to the console
app.use(morgan('dev'));
//compress all responses
app.use(compression());
// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use(cors({
	origin: "*",
	credentials: true,
}));

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

app.use((req, res, next) => {
  next(createError(404));
});

app.listen(port,function(){
  console.log("Live at Port 8000");
});


module.exports = app;