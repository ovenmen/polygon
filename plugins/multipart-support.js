'use strict';

import fastifyPlugin from "fastify-plugin";
import fastifyMultipart from '@fastify/multipart';

const multipartSupport = async (server) => {
    server.register(fastifyMultipart, {
        attachFieldsToBody: true
    });
};

export default fastifyPlugin(multipartSupport);
