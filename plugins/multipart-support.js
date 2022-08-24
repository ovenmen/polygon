'use strict';

import fastifyPlugin from "fastify-plugin";
import fastifyMultipart from '@fastify/multipart';

const multipartSupport = async (server) => {
    server.register(fastifyMultipart);
};

export default fastifyPlugin(multipartSupport);
