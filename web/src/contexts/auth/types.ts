export interface IUser {
    id?:number,
    name: string;
    email: string;
    email_verified_at:Date,
    image_path:string,
    created_at:Date,
    updated_at:Date,
    token:string|null
}

export interface IAuthContext {
    user:IUser|null,
    authenticate: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean
}

export interface IAuthProvider {
    children: JSX.Element
}