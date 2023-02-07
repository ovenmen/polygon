import { cookie } from "./cookies";
import type { IArticle, IMedia, IUser } from "./interfaces";

export interface IFetchData {
    success: boolean
    count: number
    title: string
    token: string
    articles: IArticle[]
    article: IArticle
    users: IUser[]
    user: IUser
    media: IMedia[]
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

    async change(url, { arg }) {
        const { id, ...props } = arg;
        const response = await fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.get('accessToken')}`
            },
            body: JSON.stringify({ ...props })
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

    async upload(url, { arg }) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${cookie.get('accessToken')}`
            },
            body: arg
        });

        return await response.json() as IFetchData;
    }
}

export const fetcher = new Fetcher();
