'use strict';

import fastifyPlugin from 'fastify-plugin';
import fastifyCookie from '@fastify/cookie';

const cookieSupport = async (server) => {
    server.register(fastifyCookie);
};

export default fastifyPlugin(cookieSupport);
