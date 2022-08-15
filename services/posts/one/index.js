'use strict';

import { STATUSES } from '../../../constants.js';

const getPost = async (instance) => instance.get('/posts/:id', async function (request, reply) {
    try {
        const posts = this.mongo.db.collection('posts');
        const id = this.mongo.ObjectId(request.params.id);
        const post = await posts.findOne({ _id: id });

        if (!post) {
            return reply
                .code(STATUSES.NOT_FOUND)
                .type('application/json')
                .send({
                    success: false,
                    title: "Невозможно получить пост"
                });
        }

        return reply.send(post);
    } catch (error) {
        throw new Error(error);
    }
});

export default getPost;
