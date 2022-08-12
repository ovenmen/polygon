import { server } from '../server.js';
import { STATUSES } from '../constants.js';

const deletePost = async () => server.delete('/posts/:id', async function (req, reply) {
    try {
        const posts = this.mongo.db.collection('posts');
        const id = this.mongo.ObjectId(req.params.id);

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
