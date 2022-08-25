'use strict';

export default {
    schema: {
        tags: ['post'],
        body: {
            type: 'object',
            required: ['title'],
            properties: {
                title: { type: 'string', minLength: 1 }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    title: { type: 'string' },
                }
            },
            404: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    title: { type: 'string' }
                }
            }
        }
    }
};
