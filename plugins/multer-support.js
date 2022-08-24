'use strict';

import fastifyPlugin from "fastify-plugin";
import fastifyMulter from 'fastify-multer';

const setStorage = (path) => fastifyMulter.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `uploads/${path}/`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

export const setUploadPath = (path) => fastifyMulter({ storage: setStorage(path) });

const multerSupport = async (server) => {
    server.register(fastifyMulter.contentParser);
};

export default fastifyPlugin(multerSupport);
