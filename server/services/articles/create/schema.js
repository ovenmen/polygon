'use strict';

export default {
    schema: {
        tags: ['article'],
        body: {
            type: 'object',
            required: ['header'],
            properties: {
                header: { type: 'string', minLength: 1 },
                shortDescription: { type: 'string' },
                fullDescription: { type: 'string' },
                content: { type: 'array' },
                category: { type: 'string' },
                tags: { type: 'array' },
                createdDate: { type: 'string', format: 'date-time' }
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
