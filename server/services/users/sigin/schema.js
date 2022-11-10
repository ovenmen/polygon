'use strict';

export default {
    schema: {
        tags: ['user'],
        body: {
            type: 'object',
            required: ['login', 'password'],
            properties: {
                login: { type: 'string', minLength: 6, format: 'email' },
                password: { type: 'string', minLength: 8, format: 'password' }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    title: { type: 'string' },
                    token:  { type: 'string' },
                    signDate: { type: 'string', format: 'date-time' },
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
