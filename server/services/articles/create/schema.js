'use strict';

export default {
    schema: {
        tags: ['article'],
        body: {
            type: 'object',
            required: ['header', 'shortDescription', 'category', 'mdContent'],
            properties: {
                header: { type: 'string', minLength: 1 },
                shortDescription: { type: 'string' },
                fullDescription: { type: 'string' },
                mdContent: { type: 'string' },
                category: { type: 'string' },
                tags: { type: 'array' },
                createdDate: { type: 'string', format: 'date-time' },
                modifiedDate: { type: 'string', format: 'date-time' },
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
