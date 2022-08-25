'use strict';

export default {
    schema: {
        tags: ['user'],
        body: {
            type: 'object',
            required: ['login', 'password', 'role', 'name'],
            properties: {
                login: { type: 'string', minLength: 1, format: 'email' },
                password: { type: 'string', minLength: 1, format: 'password' },
                role: { type: 'string', minLength: 1 },
                name: { type: 'string', minLength: 1 },
                about: { type: 'string' }
            }
        },
        response: {
            400: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    title: { type: 'string' }
                }
            },
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
