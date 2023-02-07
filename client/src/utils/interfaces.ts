export interface IContent {
    id: string
    type: string
    data: {
        text: string
        level: number
    }
} 

export interface IUser {
    _id: string
    login: string
    name: string
    roles: string[]
    avatar?: string
    about?: string
    createdDate?: Date
    modifiedDate?: Date
}

export interface IArticle {
    _id: string
    header: string
    shortDescription: string
    fullDescription: string
    cover: string
    content: IContent[]
    category: string[]
    createdDate: Date
    modifiedDate: Date
    user: IUser[]
}

export interface IMedia {
    _id: string
    fileName: string
    url: string,
    mimeType: string
    createdDate: Date
}

export interface IFileMetaData {
    _id: string
    fileName: string
    url: string
    createdDate: Date
}
