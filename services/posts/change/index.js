'use strict';

import { STATUSES } from '../../../constants.js';
import validation from './validation.js';
import serialize from './serialize.js';

const changePost = async (instance) => instance.patch('/posts/:id',  { ...validation, ...serialize, onRequest: [instance.authenticate] }, async function (request, reply) {
    try {
        const { body } = request;
        const id = this.mongo.ObjectId(request.params.id);
        const posts = this.mongo.db.collection('posts');
        const post = await posts.findOne({ _id: id });
        const modifiedDate = new Date();

        if (post) {
            await posts.findOneAndUpdate({ _id: id }, { $set: { ...body, modifiedDate } });

            return reply.send({
                success: true,
                title: "Пост изменен"
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

export default changePost;
