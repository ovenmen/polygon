'use strict';

export default {
    schema: {
        tags: ['post'],
        body: {
            type: 'object',
            required: ['title', 'content'],
            properties: {
                title: { type: 'string', minLength: 1 },
                content: { type: 'string'},
                user: { type: 'string' }
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
