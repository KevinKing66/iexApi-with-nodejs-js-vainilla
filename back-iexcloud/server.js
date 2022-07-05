const { port, hostname } = require('./config').getEnv();

const server = require('./src/controller/controller');

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});