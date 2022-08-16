'use strict';

import { STATUSES } from '../../../constants.js';
import validation from './validation.js';

const createPost = async (instance) => instance.post('/posts', { ...validation, onRequest: [instance.authenticate] }, async function (request, reply) {
    try {
        const { body } = request;
        const posts = this.mongo.db.collection('posts');
        const timestamp = new Date();
        await posts.insertOne({ ...body, timestamp });
    
        return reply
            .code(STATUSES.OK)
            .send({
                success: true,
                title: "Пост создан"
            });
    } catch (error) {
        throw new Error(error);
    }
});

export default createPost;
