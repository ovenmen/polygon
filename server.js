import Fastify from 'fastify';
import fastifyMongodb from '@fastify/mongodb';

const server = Fastify({ logger: true });

server.register(fastifyMongodb, {
    forceClose: true,
    url: 'mongodb://localhost:27017/polygon'
});

server.get('/posts', async function (req, reply) {
    try {
        const posts = this.mongo.db.collection('posts');
        const allPosts = await posts.find({}).toArray();

        if (!allPosts) {
            return reply.send({
                success: false,
                title: "Невозможно получить посты"
            });
        }

        return reply.send(allPosts);
    } catch (error) {
        throw new Error(error);
    }
});

server.get('/posts/:id', async function (req, reply) {
    try {
        const posts = this.mongo.db.collection('posts');
        const id = this.mongo.ObjectId(req.params.id);
        const post = await posts.findOne({ _id: id });

        if (!post) {
            reply.statusCode = 404;

            return reply.send({
                success: false,
                title: "Невозможно получить пост"
            });
        }

        return reply.send(post);
    } catch (error) {
        throw new Error(error);
    }
});

server.post('/posts', async function (req, reply) {
    try {
        const posts = this.mongo.db.collection('posts');
        const { body } = req;
        const isBodyEmpty = !body || !Object.keys(body).length;

        if (isBodyEmpty) {
            reply.statusCode = 400;

            return reply.send({
                success: false,
                title: "Невозможно создать пост"
            });
        }

        await posts.insertOne(body);
    
        return reply.send({
            success: true,
            title: "Пост создан"
        });
    } catch (error) {
        throw new Error(error);
    }
});

server.delete('/posts/:id', async function (req, reply) {
    try {
        const posts = this.mongo.db.collection('posts');
        const id = this.mongo.ObjectId(req.params.id);

        if (!id) {
            reply.statusCode = 404;

            return reply.send({
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

server.patch('/posts/:id', async function (req, reply) {
    try {
        const posts = this.mongo.db.collection('posts');
        const id = this.mongo.ObjectId(req.params.id);
        const { body } = req;
        const isBodyEmpty = !body || !Object.keys(body).length;

        if (!id) {
            reply.statusCode = 404;

            return reply.send({
                success: false,
                title: "Невозможно найти пост"
            });
        }

        if (isBodyEmpty) {
            reply.statusCode = 400;

            return reply.send({
                success: false,
                title: "Невозможно изменить пост"
            });
        }

        await posts.findOneAndUpdate({ _id: id }, { $set: body });

        return reply.send({
            success: true,
            title: "Пост изменен"
        });
    } catch (error) {
        throw new Error(error);
    }
});

server.listen({ port: 3000 }, err => {
    if (err) throw err;
});