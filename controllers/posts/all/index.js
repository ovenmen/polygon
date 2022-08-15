'use strict';

import { STATUSES } from '../../../constants.js';

const getPosts = async (instance) => instance.get('/posts', async function (request, reply) {
    try {
        const posts = this.mongo.db.collection('posts');
        const allPosts = await posts.find({}).toArray();

        if (!allPosts) {
            return reply
                .code(STATUSES.NOT_FOUND)
                .type('application/json; charset=utf-8')
                .send({
                    success: false,
                    title: "Невозможно получить посты"
                });
        }

        return reply.send(allPosts);
    } catch (error) {
        throw new Error(error);
    }
});

export default getPosts;
