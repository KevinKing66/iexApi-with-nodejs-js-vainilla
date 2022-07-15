const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {

    var service = require('../services/services');
    const reqUrl = url.parse(req.url, true);


    if (reqUrl.pathname == '/stock'&& (req.method === 'POST' || req.method === 'GET')) {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        service.getDataService(req, res);
    } else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqUrl.pathname);
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("Router wasn´t found")
    }
});