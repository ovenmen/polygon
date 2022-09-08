'use strict';

export default {
    schema: {
        tags: ['article'],
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    post: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            title: { type: 'string' },
                            content: { type: 'string' },
                            user: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string' },
                                        login: { type: 'string', format: 'email' },
                                        role: { type: 'string', pattern: 'admin|editor' },
                                        about: { type: 'string' },
                                        avatar: { type: 'string', format: 'url' }
                                    }
                                }
                            },
                            createdDate: { type: 'string', format: 'date-time' },
                            modifiedDate: { type: 'string', format: 'date-time' }
                        }
                    }
                },
                
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
