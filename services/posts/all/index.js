'use strict';

import { STATUSES } from '../../../constants.js';
import serialize from './serialize.js';

const getPosts = async (instance) => instance.get('/posts', serialize, async function (request, reply) {
    try {
        const posts = this.mongo.db.collection('posts'); console.log(request.cookie)
        const count = await posts.count();
        const allPosts = await posts.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
        ]).toArray();
        const isHavePosts = count !== 0;

        if (isHavePosts) {
            return reply
                .code(STATUSES.OK)
                .send({ posts: allPosts, count });
        }

        return reply
            .code(STATUSES.NOT_FOUND)
            .send({
                success: false,
                title: "Нет постов"
            });
    } catch (error) {
        throw new Error(error);
    }
});

export default getPosts;
