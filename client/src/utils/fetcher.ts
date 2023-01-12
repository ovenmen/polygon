import { cookie } from "./cookies";

export interface IFetch {
    get: (url: string) => Promise<IFetchData>
    post: (url: string, data) => Promise<IFetchData>
    delete: (url: string, id: string) => Promise<IFetchData>
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
    error;

    async get(url) {
        try {
            this.isLoading = true;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.get('accessToken')}`
                }
            });
            const fetchData = await response.json() as IFetchData;
            this.isLoading = false;

            return fetchData;
        } catch (error) {
            this.isLoading = false;
            this.error = error.message;
        }
    }

    async post(url, data) {
        try {
            this.isLoading = true;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const fetchData = await response.json() as IFetchData;
            this.isLoading = false;

            return fetchData;
        } catch (error) {
            this.isLoading = false;
            this.error = error.message;
        }
    }

    async delete(url, id) {
        try {
            this.isLoading = true;
            const response = await fetch(`${url}/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.get('accessToken')}`
                }
            });
            const fetchData = await response.json() as IFetchData;
            this.isLoading = false;

            return fetchData;
        } catch (error) {
            this.isLoading = false;
            this.error = error.message;
        }
    }
}

export const fetcher = new Fetcher();
