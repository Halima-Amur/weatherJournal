
const Cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path= require('path')
const port = 4800;

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(Cors());

// Initialize the main project folder

app.use(express.static(path.join(__dirname,'website'))); 

// Setup Server
app.get('/getAll', (request,response) => {
    console.log('here to get all')
    response.send(projectData).status(200).end();
});

app.post('/postData', (request, response) => {
    console.log('here to post data', request.body)
projectData={
    temp:request.body.temp,
    date:request.body.date,
    content:request.body.content
};
response.send(projectData).status(200).end();
});

console.log(path.join(__dirname,'website'));


app.listen(port, () => { 
    console.log(`server running on: http://localhost:${port}`);
});

