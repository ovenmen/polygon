import { cookie } from "./cookies";

export interface IFetch {
    get: (url: string) => Promise<IFetchData>
    post: (url: string, data) => Promise<IFetchData>
    delete: (url: string) => Promise<IFetchData>
}

export interface IUser {
    _id: string
    login: string
    name: string
    role: string
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
    articles: IArticle[],
    users: IUser[]
}

class Fetcher implements IFetch {
    isLoading = false;
    error = '';
    fetchData = null;

    async get(url) {
        this.isLoading = true;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.get('accessToken')}`
                }
            });
            this.fetchData = await response.json() as IFetchData;
            this.isLoading = false;

            return this.fetchData;
        } catch (error) {
            this.error = error;
        }
    }

    async post(url, data) {
        this.isLoading = true;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.get('accessToken')}`
                },
                body: JSON.stringify(data)
            });
            this.fetchData = await response.json() as IFetchData;
            this.isLoading = false;

            return this.fetchData;
        } catch (error) {
            this.error = error;
        }
    }

    async delete(url) {
        this.isLoading = true;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.get('accessToken')}`
                }
            });
            this.fetchData = await response.json() as IFetchData;
            this.isLoading = false;

            return this.fetchData;
        } catch (error) {
            this.error = error;
        }
    }
}

export const fetcher = new Fetcher();
