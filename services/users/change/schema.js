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
            required: ['login', 'password'],
            properties: {
                login: { type: 'string', minLength: 1, format: 'email' },
                password: { type: 'string', minLength: 1, format: 'password' },
                role: { type: 'string', minLength: 1 },
                name: { type: 'string', minLength: 1 }
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
