'use strict';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

export default async (server) => server.get('/posts', { ...schema }, async function (request, reply) {
    try {
        const posts = this.mongo.db.collection('articles');
        const count = await posts.count();
        const allPosts = await posts.aggregate([
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
                    posts: allPosts,
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
