


export interface IPost {
    _id:string
    title:string
    body:string
    picture:string
    createdAt :string
    author:string
}

export interface IUser {
    email:string
    IsActivated:boolean
    id:string
}

export type AuthType = "register" | "login";