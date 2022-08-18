'use strict';

// Plugins
import dbConnection from './plugins/db-connection.js';
import authenticate from './plugins/authenticate.js';
import cookieSupport from './plugins/cookie-support.js';

// Users
import getUsers from './services/users/all/index.js';
import register from './services/users/register/index.js';
import sigin from './services/users/sigin/index.js';
import deleteUser from './services/users/delete/index.js';
import changeUser from './services/users/change/index.js';

// Posts
import getPosts from './services/posts/all/index.js';
import getPost from './services/posts/one/index.js';
import deletePost from './services/posts/delete/index.js';
import changePost from './services/posts/change/index.js';
import createPost from './services/posts/create/index.js';

export default async (server, opts) => {
    // Plugins
    server.register(cookieSupport);
    server.register(dbConnection);
    server.register(authenticate);
    
    // Users
    server.register(getUsers);
    server.register(register);
    server.register(sigin);
    server.register(changeUser);
    server.register(deleteUser);
    
    // Posts
    server.register(createPost);
    server.register(getPosts);
    server.register(getPost);
    server.register(changePost);
    server.register(deletePost);
};
