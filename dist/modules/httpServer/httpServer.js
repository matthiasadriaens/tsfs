import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
export const create = (app) => {
    let server;
    if (process.env.NODE_ENV === 'development') {
        server = https.createServer({
            key: fs.readFileSync(path.resolve('ssl-dev/server.key'), 'utf-8'),
            cert: fs.readFileSync(path.resolve('ssl-dev/server.cert'), 'utf-8')
        }, app);
    }
    else {
        server = http.createServer(app);
    }
    return server;
};