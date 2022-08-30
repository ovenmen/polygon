'use strict';

export default {
    schema: {
        tags: ['user'],
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    user: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            login: { type: 'string' },
                            name: { type: 'string' },
                            role: { type: 'string' },
                            createdDate: { type: 'string' },
                            modifiedDate: { type: 'string' },
                            about: { type: 'string' },
                            avatar: { type: 'string' }
                        }
                    }
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
