const url = require('url');
const { apiToken, baseUrl } = require('../../config').getEnv();
var allData = {};

exports.status400 = function (req, res) {
    res.end('{message: "BAD REQUEST", status : 400}');
}

exports.status404 = function (req, res) {
    res.end('{message: "NO FOUND", status : 404}');
}

exports.getDataService = function async(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("accept", "*/*");
    res.setHeader("Access-Control-Allow-Origin", "*");

    viewer = req.origin ? req.origin : "http://127.0.0.1:5500/";
    origin = new URL(req.url, viewer);

    if (req.url.includes('undefined')){

        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.status = 400;
        res.end('{message: "BAD REQUEST, U need defined symbol"}');

    }else if (origin.searchParams.has("symbol")) {

        symbol = origin.searchParams.get("symbol");
        symbol = symbol.toLowerCase();
        uri = `${baseUrl}stock/${symbol}/quote?token=${apiToken}`;
        httpsGet(uri);
        response = getData(symbol);
        if (response !== undefined) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            console.log(response);
            res.end(JSON.stringify(response));
        } else {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.statusCode = 500;
            console.log("No send data");
            res.end('{message: "No send data, u should try again"}');
        }
    }
}

function httpsGet(url) {
    data = "";
    req = https.get(url, (res) => {

        console.log(res.req.path)
        if (res.statusCode !== 200) {
            // res.writeHead(404, { 'Content-Type': 'text/html' });
            console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
            res.resume();
            return;
        }

        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        path = res.req.path;
        symbol = getSymbol(path);

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
    array = path.split("/");
    return array[3];
}

const https = require('https');