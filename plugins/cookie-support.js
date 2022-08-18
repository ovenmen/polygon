'use strict';

import fastifyPlugin from "fastify-plugin";
import fastifyCookie from '@fastify/cookie';
import env from 'dotenv';

const cookieSupport = async (server) => {
    env.config();

    server.register(fastifyCookie, {
        secret: process.env.COOKIE_SECRET
    });
};

export default fastifyPlugin(cookieSupport);
