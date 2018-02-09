import path from "path";
import _ from "lodash";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// environment configurations will extend this base configuration
// ==============================================================
const base = {
    env: process.env.NODE_ENV,

    // root path of server
    root: path.normalize(`${__dirname}/../../..`),

    // server port
    port: process.env.PORT || 9000,

    // server ip
    ip: process.env.IP || '0.0.0.0',

    cors: true,

    // mysql connection options
    mysql: {
        database: 'todo',
        host: 'localhost',
        username: 'root',
        password: 'root'
    }
};


/* eslint-disable global-require */
const envConfig = require(`./${process.env.NODE_ENV}`).default;
/* eslint-enable global-require */

const config = _.merge(
    base, envConfig);

// export configuration based on NODE_ENV
// ==============================================
export default config;
