'use strict';

import fastifyPlugin from "fastify-plugin";
import jwt from '@fastify/jwt';

const authenticate = async (server) => {
    server.register(jwt, {
        secret: process.env.SECRET,
        cookie: {
            cookieName: 'token',
            signed: true
        }
    });
    
    return server.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify();
        } catch (err) {
            if (request.url === '/admin') {
                reply.redirect('/admin/sigin');
            }

            reply.send(err);
        }
    });
};

export default fastifyPlugin(authenticate);
