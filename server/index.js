import moment from "moment-timezone";
import Koa from "koa";
import requestId from "koa-requestid";
import convert from "koa-convert";
import route from "./route";
import config from "./config/environment";
import { DEFAULT_TIMEZONE} from "./components/constants";
import logger from "./components/logger";
import middleware from "./middleware";
import db from "./models/";
import onerror from "./components/onerror";

// set default timezone
moment.tz.setDefault(DEFAULT_TIMEZONE);

const app = new Koa();

// error handler
onerror(app);

app.keys = config.keys;
app.use(middleware());
app.use(convert(requestId()));
app.use(route());

// connect to mysql & start server
(async() => {
    try {
        await db.sequelize.authenticate()
        logger.info('connected to mysql %s:%s', config.mysql.host, config.mysql.database);
    } catch (error) {
        logger.error(error);
        process.exit(-1);
    }
    await app.listen(config.port, config.ip);
    logger.info('Server start at %s:%s', config.ip, config.port);
})();
