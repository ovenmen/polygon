'use strict';

export default {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    title: { type: 'string' },
                }
            }
        }
    }
};
