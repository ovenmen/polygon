'use strict';

export default {
    schema: {
        tags: ['user'],
        body: {
            type: 'object',
            required: ['login', 'password'],
            properties: {
                login: { type: 'string', minLength: 1, format: 'email' },
                password: { type: 'string', minLength: 1, format: 'password' }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    title: { type: 'string' },
                    token:  { type: 'string' }
                }
            },
            400: {
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
