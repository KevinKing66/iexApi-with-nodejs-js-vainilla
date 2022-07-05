const url = require('url');
const { apiToken, baseUrl } = require('../../config').getEnv();
var allData = {};

exports.status400 = function (req, res){
    res.end('{message: "Status 400"}');
}

exports.status404 = function (req, res){
    res.end('{message: "Status 404"}');
}

exports.getData = function async(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("accept", "*/*");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { 'Content-Type': 'text/html' });
    if(req.url.includes('undefined')){
        res.statusCode(500)
    }

    viewer = req.origin ? req.origin : "http://127.0.0.1:5500/";
    origin = new URL(req.url, viewer);

    if (origin.searchParams.has("symbol")) {
        symbol = origin.searchParams.get("symbol");
        symbol = symbol.toLowerCase();
        uri = `${baseUrl}stock/${symbol}/quote?token=${apiToken}`;
        httpsGet(uri);
        response = getData(symbol);
        if (response !== undefined) {
            console.log(response);
            res.end(JSON.stringify(response));
        } else {
            console.log("No send data");
            res.end('{message: "No send data"}');
        }
    }
}

function httpsGet(url) {
    data = "";
    req = https.get(url, (res) => {

        console.log(res.req.path)
        if (res.statusCode !== 200) {
            console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
            res.resume();
            return;
        }

        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        host = res.req.protocol + res.req.host;
        path = res.req.path;
        url = new URL(path, host);
        symbol = getSymbol(url);

        res.on('close', () => {
            data = JSON.parse(data);
            setData(symbol, data);
            return data;
        });
    });
    req.end(data);
}
function setData(symbol, data) {
    allData[symbol] = data;
}

function getData(symbol) {
    return allData[symbol];
}

function getSymbol(path) {
    path = '/stable/stock/aapl/quote';
    array = path.split("/");
    return array[3];
}

const https = require('https');