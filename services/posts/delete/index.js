'use strict';

import { STATUSES } from '../../../constants.js';

const deletePost = async (instance) => instance.delete('/posts/:id',  { onRequest: [instance.authenticate] }, async function (request, reply) {
    try {
        const posts = this.mongo.db.collection('posts');
        const id = this.mongo.ObjectId(request.params.id);

        if (!id) {
            return reply
                .code(STATUSES.NOT_FOUND)
                .type('application/json')
                .send({
                    success: false,
                    title: "Невозможно удалить пост"
                });
        }

        await posts.findOneAndDelete({ _id: id });

        return reply.send({
            success: true,
            title: "Пост удален"
        });
    } catch (error) {
        throw new Error(error);
    }
});

export default deletePost;
