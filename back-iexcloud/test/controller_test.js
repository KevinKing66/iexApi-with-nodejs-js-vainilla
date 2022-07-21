exports.it = (function () {
    'use strict';
    
    expectedRes = { "avgTotalVolume": 74946037, "calculationPrice": "iexlasttrade", "change": 2.04, "changePercent": 0.01351, "close": null, "closeSource": "official", "closeTime": null, "companyName": "Apple Inc", "currency": "USD", "delayedPrice": null, "delayedPriceTime": null, "extendedChange": null, "extendedChangePercent": null, "extendedPrice": null, "extendedPriceTime": null, "high": null, "highSource": null, "highTime": null, "iexAskPrice": 0, "iexAskSize": 0, "iexBidPrice": 0, "iexBidSize": 0, "iexClose": 153.04, "iexCloseTime": 1658347199538, "iexLastUpdated": 1658349732355, "iexMarketPercent": 0.019025221426964514, "iexOpen": 151.12, "iexOpenTime": 1658323800491, "iexRealtimePrice": 152.46, "iexRealtimeSize": 100, "iexVolume": 1233009, "lastTradeTime": 1658347199538, "latestPrice": 153.04, "latestSource": "IEX Last Trade", "latestTime": "July 20, 2022", "latestUpdate": 1658347199538, "latestVolume": null, "low": null, "lowSource": null, "lowTime": null, "marketCap": 2476980100240, "oddLotDelayedPrice": null, "oddLotDelayedPriceTime": null, "open": null, "openTime": null, "openSource": "official", "peRatio": 24.88, "previousClose": 151, "previousVolume": 82982367, "primaryExchange": "NASDAQ", "symbol": "AAPL", "volume": null, "week52High": 182.44, "week52Low": 129.04, "ytdChange": -0.13378684629715068, "isUSMarketOpen": false };
    /**
     * test function
     * @param {string} desc
     * @param {function} fn
     */
    function it(desc, fn) {
        try {
            fn();
            console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + desc);
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc);
        }
    }
    it('should fail', function () {
        equals = false;
        request(expectedRes, equals);
    });
    it('should pass', function () {
        request(expectedRes, equals);
    });
})();
function assert(isTrue) {
    if (!isTrue) {
        throw new error;
    }
};

function request(expectedRes, equals) {
    var options = {
        'method': 'GET',
        'hostname': 'localhost',
        'port': 3000,
        'path': '/stock?symbol=aapl',
        'headers': {
        },
        'maxRedirects': 20
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
            condition;
            condition = equals ? expectedRes == body.toString() : expectedRes != body.toString();
            assert(condition)
        });

        res.on("error", function (error) {
            console.error(error);
        });
    });
    req.end();
}

