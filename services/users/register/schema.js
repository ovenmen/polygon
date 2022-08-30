'use strict';

export default {
    schema: {
        tags: ['user'],
        body: {
            type: 'object',
            required: ['login', 'password', 'role', 'name'],
            properties: {
                login: { type: 'string', minLength: 6, format: 'email' },
                password: { type: 'string', minLength: 8, format: 'password' },
                role: { type: 'string', minLength: 1, pattern: 'admin|editor' },
                name: { type: 'string', minLength: 1 },
                about: { type: 'string' },
                avatar: { type: 'string', format: 'url'}
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
