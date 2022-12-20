import { Api } from "../../services/api";
import { IUser } from "./types";

export async function LoginRequest(email: string, password: string) {

    const response = await Api.post('/autenticar', { email, password });

    return response.data;
}

export function setUserLocalStorage(user: IUser | null) {
    localStorage.setItem('@car.show.user', JSON.stringify(user));
}

export function getUserLocalStorage(): IUser|null {
    const user = localStorage.getItem('@car.show.user');

    if (!user)
        return null;


    return JSON.parse(user);
}