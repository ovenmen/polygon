'use strict';

import Fastify from 'fastify';
import fastifyMongodb from '@fastify/mongodb';
import env from 'dotenv';

// Plugins
import authenticate from './plugins/authenticate.js';

// Users
import getUsers from './services/users/all/index.js';
import register from './services/users/register/index.js';
import sigin from './services/users/sigin/index.js';
import deleteUser from './services/users/delete/index.js';
import changeUser from './services/users/change/index.js';

// Posts
import getPosts from './services/posts/all/index.js';
import getPost from './services/posts/one/index.js';
import deletePost from './services/posts/delete/index.js';
import changePost from './services/posts/change/index.js';
import createPost from './services/posts/create/index.js';

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
server.register(getUsers);
server.register(register);
server.register(sigin);
server.register(changeUser);
server.register(deleteUser);

// Posts
server.register(createPost);
server.register(getPosts);
server.register(getPost);
server.register(changePost);
server.register(deletePost);

server.listen({ port }, err => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }

    console.log(`Server started on http://localhost:${port}`);
});
