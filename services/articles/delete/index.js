'use strict';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

export default async (server) => server.delete('/posts/:id',  { ...schema, onRequest: [server.authenticate] }, async function (request, reply) {
    try {
        const id = this.mongo.ObjectId(request.params.id);
        const posts = this.mongo.db.collection('articles');
        const post = await posts.findOne({ _id: id });

        if (post) {
            await posts.findOneAndDelete({ _id: id });

            return reply
                .code(STATUSES.OK)
                .send({
                    success: true,
                    title: 'Пост удален'
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
