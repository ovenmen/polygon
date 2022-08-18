'use strict';

const serialize = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    users: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                login: { type: 'string' },
                                role: { type: 'string' },
                                createdDate: { type: 'string' },
                                modifiedDate: { type: 'string' }
                            }
                        }
                    },
                    count: { type: 'number' }
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

export default serialize;
