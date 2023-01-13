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
        body: {
            type: 'object',
            properties: {
                modifiedDate: { type: 'string', format: 'date-time' },
                login: { type: 'string', minLength: 1, format: 'email' },
                password: { type: 'string', minLength: 1, format: 'password' },
                roles: { type: 'array',
                    items: { type: 'string', minLength: 1 }
                },
                name: { type: 'string', minLength: 1 },
                about: { type: 'string' },
                avatar: { type: 'string', format: 'url' }
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
            302: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    error: { type: 'string' }
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
