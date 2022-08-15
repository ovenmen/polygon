'use strict';

import { STATUSES } from '../../../constants.js';

const createPost = async (instance) => instance.post('/posts', { onRequest: [instance.authenticate] }, async function (request, reply) {
    try {
        const posts = this.mongo.db.collection('posts');
        const { body } = request;
        const isBodyEmpty = !body || !Object.keys(body).length;

        if (isBodyEmpty) {
            return reply
                .code(STATUSES.BAD_REQUEST)
                .type('application/json')
                .send({
                    success: false,
                    title: "Невозможно создать пост"
                });
        }

        await posts.insertOne(body);
    
        return reply.send({
            success: true,
            title: "Пост создан"
        });
    } catch (error) {
        throw new Error(error);
    }
});

export default createPost;
