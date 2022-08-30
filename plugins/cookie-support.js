'use strict';

import fastifyPlugin from "fastify-plugin";
import fastifyCookie from '@fastify/cookie';

const cookieSupport = async (server) => {
    server.register(fastifyCookie, {
        secret: process.env.COOKIE_SECRET
    });
};

export default fastifyPlugin(cookieSupport);
