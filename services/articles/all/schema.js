'use strict';

export default {
    schema: {
        tags: ['post'],
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
                                            role: { type: 'string' },
                                            about: { type: 'string' },
                                            avatar: { type: 'string' }
                                        }
                                    }
                                },
                                createdDate: { type: 'string' },
                                modifiedDate: { type: 'string' }
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
