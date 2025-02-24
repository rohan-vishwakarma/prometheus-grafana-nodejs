require('dotenv').config();
const express = require('express');
const client = require('prom-client'); // Metric Collection
const getStudentsData = require('./data');
const students = require('./controllers');
const logger   = require('./logger');
const app = express();
const EXPRESS_PORT = process.env.EXPRESS_PORT;

app.use(logger);


// Metric Collection (Prometheus)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register, prefix: 'nodejsapp_' });


// Application Endpoint
app.get('/', (req, res) => {
    res.send("<p>This is a Express App</p>");
});

app.get('/students', students);


//Prometheus Metrics Endpoint
app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
});

app.listen(EXPRESS_PORT, (error) =>{
    if(!error)
    {
        console.log("Server is Successfully Running and App is listening on port "+ EXPRESS_PORT)
    }
    else 
        console.log("Error occurred, server can't start", error);
    }
);
