'use strict';

import fastifyPlugin from 'fastify-plugin';
import jwt from '@fastify/jwt';

const authenticate = async (server) => {
    server.register(jwt, {
        secret: process.env.SECRET,
        cookie: {
            cookieName: 'token',
            signed: true
        },
        verify: { maxAge: '15m' }
    });
    
    return server.decorate('authenticate', async function (request, reply) {
        try {
            await request.jwtVerify();
            await request.jwtVerify({ onlyCookie: true });
        } catch (err) {
            reply.send(err);
        }
    });
};

export default fastifyPlugin(authenticate);
