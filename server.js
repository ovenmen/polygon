import Fastify from 'fastify';
import fastifyMongodb from '@fastify/mongodb';

import getPosts from './controllers/get-posts.js';
import getPost from './controllers/get-post.js';
import deletePost from './controllers/delete-post.js';
import changePost from './controllers/change-post.js';
import createPost from './controllers/create-post.js';

export const server = Fastify({ logger: true });
const port = process.env.PORT || 3000;

server.register(fastifyMongodb, {
    forceClose: true,
    url: 'mongodb://localhost:27017/polygon'
});

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
