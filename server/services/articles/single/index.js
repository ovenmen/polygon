'use strict';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

export default async (server) => server.get('/api/articles/:id', { ...schema }, async function (request, reply) {
    try {
        const id = new this.mongo.ObjectId(request.params.id);
        const articles = this.mongo.db.collection('articles');
        const article = await articles.aggregate([
            {
                $match: { _id: id }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
        ]).toArray();

        if (article.length !== 0) {
            return reply
                .code(STATUSES.OK)
                .send({
                    success: true,
                    article: article.at(0)
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
