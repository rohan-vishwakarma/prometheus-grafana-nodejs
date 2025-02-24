const fs = require('fs');
const util = require('util');

const logFile = fs.createWriteStream('request_logs.txt', { flags: 'a' });
const logStdout = process.stdout;

console.log = function () {
    logFile.write(util.format.apply(null, arguments) + '\n');
    logStdout.write(util.format.apply(null, arguments) + '\n');
};

module.exports = (req, res, next) => {
    const start = Date.now();
    
    console.log(`Request: ${req.method} ${req.url}`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);
    console.log(`Body: ${JSON.stringify(req.body)}`);

    let oldSend = res.send;
    let responseBody = '';

    res.send = function (data) {
        responseBody = data;  
        oldSend.apply(res, arguments);
    };

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`Response Status: ${res.statusCode}`);
        console.log(`Response Time: ${duration}ms`);
        console.log(`Response Data: ${responseBody}`);  
        console.log(`Response Headers: ${JSON.stringify(res.getHeaders())}`);
    });

    next();
};
