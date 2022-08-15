'use strict';

import { STATUSES } from '../../../constants.js';

const changePost = async (instance) => instance.patch('/posts/:id',  { onRequest: [instance.authenticate] }, async function (request, reply) {
    try {
        const posts = this.mongo.db.collection('posts');
        const id = this.mongo.ObjectId(request.params.id);
        const { body } = request;
        const isBodyEmpty = !body || !Object.keys(body).length;

        if (!id) {
            return reply
                .code(STATUSES.NOT_FOUND)
                .type('application/json')
                .send({
                    success: false,
                    title: "Невозможно найти пост"
                });
        }

        if (isBodyEmpty) {
            return reply
                .code(STATUSES.BAD_REQUEST)
                .type('application/json')
                .send({
                    success: false,
                    title: "Невозможно изменить пост"
                });
        }

        await posts.findOneAndUpdate({ _id: id }, { $set: body });

        return reply.send({
            success: true,
            title: "Пост изменен"
        });
    } catch (error) {
        throw new Error(error);
    }
});

export default changePost;
