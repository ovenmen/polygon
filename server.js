'use strict';

import {
    dbConnection,
    authenticate,
    cookieSupport,
    corsSupport,
    helmetProtection,
    multipartSupport,
    staticSupport
} from './plugins/index.js';

import {
    getUsers,
    register,
    sigin,
    deleteUser,
    changeUser,
    getPosts,
    getPost,
    createPost,
    changePost,
    deletePost,
    uploadFile
} from './services/index.js';

const plugins = [
    dbConnection,
    cookieSupport,
    authenticate,
    corsSupport,
    helmetProtection,
    multipartSupport,
    staticSupport
];

const routes = {
    users: [
        getUsers,
        register,
        sigin,
        deleteUser,
        changeUser
    ],
    posts: [
        getPosts,
        getPost,
        createPost,
        changePost,
        deletePost,
    ],
    upload: [
        uploadFile
    ]
};

export default async (server, opts) => {
    // Plugins
    plugins.forEach(plugin => {
        server.register(plugin);
    });
   
    // Users
    routes.users.forEach(route => {
        server.register(route);
    });
    
    // Posts
    routes.posts.forEach(route => {
        server.register(route);
    });

    // Upload
    routes.upload.forEach(route => {
        server.register(route);
    });
};
