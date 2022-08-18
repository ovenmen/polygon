'use strict';

import fastifyPlugin from "fastify-plugin";
import fastifyCookie from '@fastify/helmet';

const helmetProtection = async (server) => {
    server.register(fastifyCookie, {});
};

export default fastifyPlugin(helmetProtection);
