'use strict';

export default {
    schema: {
        tags: ['user'],
        body: {
            type: 'object',
            required: ['login', 'password', 'roles', 'name'],
            properties: {
                createdDate: { type: 'string', format: 'date-time' },
                login: { type: 'string', minLength: 6, format: 'email' },
                password: { type: 'string', minLength: 8, format: 'password' },
                roles: { type: 'array',
                    items: { type: 'string', minLength: 1 }
                },
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
