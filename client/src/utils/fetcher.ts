import { cookie } from "./cookies";

export interface IUser {
    _id: string
    login: string
    name: string
    roles: string[]
    avatar: string
    about: string
    createdDate: Date
    modifiedDate: Date
}

export interface IArticle {
    _id: string
    header: string
    shortDescription: string
    fullDescription: string
    content: string
    category: string[]
    createdDate: Date
    modifiedDate: Date
    user: IUser[]
}

export interface IFetchData {
    success: boolean
    count: number
    title: string
    token: string
    articles: IArticle[]
    article: IArticle
    users: IUser[]
    error: string
}

class Fetcher {
    async get(url) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.get('accessToken')}`
            }
        });
        return await response.json() as IFetchData;
    }

    async post(url, { arg }) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.get('accessToken')}`
            },
            body: JSON.stringify(arg)
        });
        return await response.json() as IFetchData;
    }

    async delete(url, { arg }) {
        const response = await fetch(`${url}/${arg.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.get('accessToken')}`
            }
        });
        return await response.json() as IFetchData;
    }
}

export const fetcher = new Fetcher();
