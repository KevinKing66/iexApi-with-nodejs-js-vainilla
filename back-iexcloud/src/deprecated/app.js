const http = require('http');
const https = require('https');
const { port, apiToken, baseUrl } = require('../../config').getEnv();
var allData = {};

http.createServer(async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("accept", "*/*");
    res.setHeader("Access-Control-Allow-Origin", "*");
    
    res.writeHead(200, {'Content-Type': 'text/html'});

    viewer = req.origin ? req.origin : "http://127.0.0.1:5500/";
    origin = new URL(req.url, viewer);
    switch (origin.pathname) {
        case "/stock":
            if (origin.searchParams.has("symbol")) {
                symbol = origin.searchParams.get("symbol");
                url = `${baseUrl}stock/${symbol}/quote?token=${apiToken}`;
                httpsGet(url, symbol);
                response = getData(symbol);
                if(response !== undefined){
                    res.end(JSON.stringify(response));
                }else{

                    res.end()
                }
            }
            break;
    };
}).listen(port, () => console.log("init sever in port: " + port));

function httpsGet(url) {
    data = "";
    req = https.get(url, (res) => {
        if (res.statusCode !== 200) {
            console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
            res.resume();
            return;
        }

        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
            // console.log(` BODY: ${chunk}`);
        });

        host = res.req.protocol + res.req.host;
        path = res.req.path;
        url = new URL(path, host);
        symbol = getSymbol(url);

        res.on('close', () => {
            data = JSON.parse(data);
            saveData(symbol, data);
            return data;
        });
    });
    console.log(data);
    req.end(data);
}

function saveData(symbol, data){
    allData[symbol] = data;
}

function getData(symbol){
    return allData[symbol];
}

function getSymbol(path){
    path = '/stable/stock/aapl/quote';
    array = path.split("/");
    return array[3];
}