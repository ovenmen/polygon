'use strict';

export default {
    schema: {
        tags: ['user'],
        params: {
            type: 'object',
            required: ['id'],
            properties: {
                id: { type: 'string', minLength: 1 }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    title: { type: 'string' }
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
