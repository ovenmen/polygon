'use strict';

import env from 'dotenv';

import {
    dbConnection,
    authenticate,
    cookieSupport,
    corsSupport,
    helmetProtection,
    multipartSupport,
    staticSupport,
    swagger,
    viewSupport
} from './plugins/index.js';

import {
    getArticles,
    getArticle,
    changeArticle,
    deleteArticle,
    createArticle
} from './services/articles/index.js';

import {
    registerUser,
    siginUser,
    getUser,
    getUsers,
    changeUser,
    deleteUser
} from './services/users/index.js';

import {
    adminDashboard,
    adminSign,
    adminUsers
} from './services/admin/index.js';

import {
    uploadMultipart
} from './services/uploads/index.js';

env.config({ path: '.config.env' });

const plugins = [
    dbConnection,
    cookieSupport,
    authenticate,
    corsSupport,
    helmetProtection,
    multipartSupport,
    staticSupport,
    swagger,
    viewSupport
];

const publicRoutes = [
    getArticles,
    getArticle,
    getUsers,
    getUser,
    registerUser,
    siginUser,
    adminSign
];

const protectedRoutes = [
    changeArticle,
    deleteArticle,
    createArticle,
    changeUser,
    deleteUser,
    uploadMultipart,
    adminDashboard,
    adminUsers
];

export default async (server, opts) => {
    // Plugins
    plugins.forEach(plugin => {
        server.register(plugin);
    });
   
    // Public routes
    publicRoutes.forEach(route => {
        server.register(route);
    });
    
    // Protected routes
    protectedRoutes.forEach(route => {
        server.register(route);
    });
};
