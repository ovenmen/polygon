'use strict';

import { STATUSES } from '../../../constants.js';
import validation from './validation.js';

const deletePost = async (instance) => instance.delete('/posts/:id',  { ...validation, onRequest: [instance.authenticate] }, async function (request, reply) {
    try {
        const id = this.mongo.ObjectId(request.params.id);
        const posts = this.mongo.db.collection('posts');
        const post = await posts.findOne({ _id: id });

        if (post) {
            await posts.findOneAndDelete({ _id: id });

            return reply
                .code(STATUSES.OK)
                .send({
                    success: true,
                    title: "Пост удален"
                });
        }

        return reply
            .code(STATUSES.NOT_FOUND)
            .send({
                success: false,
                title: "Пост не найден"
            });
    } catch (error) {
        throw new Error(error);
    }
});

export default deletePost;
