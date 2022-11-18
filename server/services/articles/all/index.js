'use strict';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

export default async (server) => server.get('/api/articles', { ...schema }, async function (request, reply) {
    try {
        const articles = this.mongo.db.collection('articles');
        const count = await articles.count();
        const allArticles = await articles.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
        ]).toArray();
        const isHavePosts = count !== 0;

        if (isHavePosts) {
            return reply
                .code(STATUSES.OK)
                .send({
                    success: true,
                    articles: allArticles,
                    count
                });
        }

        return reply
            .code(STATUSES.NOT_FOUND)
            .send({
                success: false,
                error: 'Нет постов'
            });
    } catch (error) {
        throw new Error(error);
    }
});
