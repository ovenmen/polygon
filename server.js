'use strict';

import Fastify from 'fastify';
import fastifyMongodb from '@fastify/mongodb';
import env from 'dotenv';

import authenticate from './plugins/authenticate.js';

// Users
import register from './controllers/users/register/index.js';
import sigin from './controllers/users/sigin/index.js';

// Posts
import getPosts from './controllers/posts/all/index.js';
import getPost from './controllers/posts/one/index.js';
import deletePost from './controllers/posts/delete/index.js';
import changePost from './controllers/posts/change/index.js';
import createPost from './controllers/posts/create/index.js';

env.config();

const server = Fastify({ logger: true });
const port = process.env.PORT || 80;

// Plugins
server.register(fastifyMongodb, {
    forceClose: true,
    url: process.env.DB_CONNECTION_URL
});
server.register(authenticate);

// Users
server.register(register);
server.register(sigin);

// Posts
server.register(createPost);
server.register(getPosts);
server.register(getPost);
server.register(deletePost);
server.register(changePost);

server.listen({ port }, err => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }

    console.log(`Server started on http://localhost:${port}`);
});
