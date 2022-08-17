'use strict';

import { STATUSES } from '../../../constants.js';
import validation from './validation.js';
import serialize from './serialize.js';

const createPost = async (instance) => instance.post('/posts', { ...validation, ...serialize, onRequest: [instance.authenticate] }, async function (request, reply) {
    try {
        const { body } = request;
        const posts = this.mongo.db.collection('posts');
        const createdDate = new Date();
        await posts.insertOne({ ...body, user: this.mongo.ObjectId(request.user.id), createdDate });
    
        return reply
            .code(STATUSES.CREATED)
            .send({
                success: true,
                title: "Пост создан"
            });
    } catch (error) {
        throw new Error(error);
    }
});

export default createPost;
