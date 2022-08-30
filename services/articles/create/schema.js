'use strict';

export default {
    schema: {
        tags: ['article'],
        body: {
            type: 'object',
            required: ['title', 'content'],
            properties: {
                title: { type: 'string', minLength: 1 },
                content: { type: 'string' },
                user: { type: 'string', format: 'url' }
            }
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    title: { type: 'string' }
                }
            }
        }
    }
};
