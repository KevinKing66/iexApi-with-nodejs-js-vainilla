const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {

    var service = require('../services/services');
    const reqUrl = url.parse(req.url, true);


    if (reqUrl.pathname == '/test' && req.method === 'POST') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        service.testRequest(req, res);

    } else if (reqUrl.pathname == '/stock') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        service.getDataService(req, res);
    } else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqUrl.pathname);
    }
});