'use strict';

import { STATUSES } from '../../../constants.js';

const getPosts = async (instance) => instance.get('/posts', async function (request, reply) {
    try {
        const posts = this.mongo.db.collection('posts');
        const allPosts = await posts.find({}).toArray();
        const isHavePosts = posts.count() !== 0;

        if (isHavePosts) {
            return reply
                .code(STATUSES.OK)
                .send(allPosts);
        }

        return reply
            .code(STATUSES.NOT_FOUND)
            .send({
                success: false,
                title: "Нет постов"
            });
    } catch (error) {
        throw new Error(error);
    }
});

export default getPosts;
