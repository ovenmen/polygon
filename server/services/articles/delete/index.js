'use strict';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

export default async (server) => server.delete('/api/articles/:id',  { ...schema, onRequest: [server.authenticate] }, async function (request, reply) {
    try {
        const id = new this.mongo.ObjectId(request.params.id);
        const articles = this.mongo.db.collection('articles');
        const article = await articles.findOne({ _id: id });

        if (article) {
            await articles.findOneAndDelete({ _id: id });

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
