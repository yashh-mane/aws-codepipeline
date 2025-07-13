const https = require('https');
const { hostname } = require('os');
const dotenv = require("dotenv");

dotenv.config();

async function apiInvoke(requestData) {
    const options = {
        hostname: 'jsonplaceholder.typicode.com',
        port: 443,
        path: '/posts',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestData),
        },
        timeout: 5000
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => (body += chunk));
            res.on('end', () => {
                try {
                    const responseBody = JSON.parse(body);

                    resolve({
                        statusCode: res.statusCode,
                        body:responseBody
                    });  
                } catch (error) {
                    console.error('Error parsing response as JSON:', error.message);
                    reject({
                        statusCode: res.statusCode,
                        body,
                        error: 'Invalid JSON response from Backend',
                    });
                }
            });
        });

        req.on('error', (error) => {
            console.error('Request error:', error.message);

            // Reject with a generic error object
            reject({
                statusCode: 500,
                body: null,
                error: 'Backend request failed',
            });
        });

        // Handle timeout
        req.on('timeout', () => {
            console.error('Backend request timed out.');

                    reject({
                        statusCode: 504,
                        body: null,
                        error: 'Backend request timeout',
                    });
                });

        req.write(requestData);
        req.end();
    });
}


module.exports = apiInvoke;
