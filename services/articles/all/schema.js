'use strict';

export default {
    schema: {
        tags: ['article'],
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    count: { type: 'number' },
                    posts: {
                        type: 'array',
                        items: {
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
                                            name: { type: 'string' },
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
