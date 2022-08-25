'use strict';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

export default async (server) => server.get('/posts/:id', { ...schema }, async function (request, reply) {
    try {
        const id = this.mongo.ObjectId(request.params.id);
        const posts = this.mongo.db.collection('posts');
        const post = await posts.aggregate([
            {
                $match: { _id: id }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
        ]).toArray();

        if (post) {
            return reply
                .code(STATUSES.OK)
                .send(post);
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
