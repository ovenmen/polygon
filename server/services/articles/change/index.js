'use strict';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

export default async (server) => server.patch('/posts/:id',  { ...schema, onRequest: [server.authenticate] }, async function (request, reply) {
    try {
        const { body } = request;
        const id = this.mongo.ObjectId(request.params.id);
        const posts = this.mongo.db.collection('articles');
        const post = await posts.findOne({ _id: id });
        const modifiedDate = new Date();

        if (post) {
            await posts.findOneAndUpdate({ _id: id }, { $set: { ...body, modifiedDate } });

            return reply
                .code(STATUSES.OK)
                .send({
                    success: true,
                    title: 'Пост изменен'
                });
        }

        return reply
            .code(STATUSES.NOT_FOUND)
            .send({
                success: false,
                error: 'Пост не найден'
            });
    } catch (error) {
        throw new Error(error);
    }
});
