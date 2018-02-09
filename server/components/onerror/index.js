import _ from "lodash";
import assert from "assert";
import logger from "../logger";

/**
 * pick necessary params from error object
 * @param err
 * @returns {{errors: Array}}
 */
function filterErrors(err) {
    const errors = _.pick(err, 'errors');
    const keys = _.keys(errors.errors);
    const response = [];
    let key = null;
    for (key of keys) {
        const error = _.pick(errors.errors[key], 'path', 'name', 'message');
        response.push({field: error.path, name: error.name, message: error.message});
    }
    return {errors: response};
}

function onerror(app) {
    app.context.onerror = function (err) {
        // don't do anything if there is no onerror.
        // this allows you to pass `this.onerror`
        // to node-style callbacks.
        if (err === null) {
            return;
        }

        assert(err instanceof Error, `non-error thrown: ${err}`);

        // delegate
        // this.app.emit('error', err, this);

        // nothing we can do here other
        // than delegate to the app-level
        // handler and log.
        if (this.headerSent || !this.writable) {
            err.headerSent = true;
            return;
        }

        // ENOENT support
        if (err.code === 'ENOENT') {
            err.status = 404;
        }
        if (err.errorCode) {
            this.status = err.httpCode;
            this.type = 'application/json';
            const response = {code: err.errorCode, name: err.name, message: err.message};
            this.res.end(JSON.stringify(response));
        } else {
            if (err.name === 'ValidationError') {
                this.status = 422;
            } else if (err.name === 'CastError') {
                this.status = 400;
            } else {
                logger.error(err);
                this.status = 500;
            }
            if (!(this.status === 400 || this.status === 403)) {
                this.type = 'application/json';
                if (this.status === 422) {
                    this.res.end(JSON.stringify(filterErrors(err)));
                } else {
                    this.res.end(JSON.stringify(err));
                }
            } else {
                this.res.end();
            }
        }
    };
}

export default onerror;
