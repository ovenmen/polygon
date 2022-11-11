'use strict';

import fastifyPlugin from 'fastify-plugin';
import fastifySession from '@fastify/session';

const sessionSupport = async (server) => {
    server.register(fastifySession, {
        cookieName: 'sessionId',
        secret: process.env.COOKIE_SECRET,
        cookie: { secure: false },
        expires: 1800000
    });
    server.addHook('preHandler', (request, reply, next) => {
        request.session.user = {name: 'max'};
        next();
    });
};

export default fastifyPlugin(sessionSupport);
