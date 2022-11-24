'use strict';

export default {
    schema: {
        tags: ['article'],
        body: {
            type: 'object',
            required: ['title'],
            properties: {
                header: { type: 'string', minLength: 1 },
                shortDescription: { type: 'string' },
                fullDescription: { type: 'string' },
                mdContent: { type: 'string' },
                category: { type: 'string' },
                tags: { type: 'array' }
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
                    error: { type: 'string' }
                }
            }
        }
    }
};
