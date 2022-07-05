const fs = require('fs');
    const path = require('path');
    const { parseBuffer } = require('./src/helpers/parse');

    const getEnv = () => {
      const envFilePath = path.join(__dirname, '.env');
      const bufferEnv = fs.readFileSync(envFilePath);
      const envObject = parseBuffer(bufferEnv);

      Object.keys((envObject || {})).map(key => {
        if(!process.env[key] && process.env[key] !== envObject[key]){
          process.env[key] = envObject[key];
        }
      });

      const apiToken = process.env.APITOKEN;
      const port = process.env.PORT;
      const baseUrl = process.env.BASEURL;
      const hostname = process.env.HOSTNAME;

      return {
        apiToken,
        port,
        baseUrl,
        hostname
      }
    }

    module.exports = {
      getEnv
    }