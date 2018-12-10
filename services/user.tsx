import * as JwtDecode from "jwt-decode";
import axios from "axios";
import { AxiosResponse } from "axios";
import { configVals } from "./config";

interface authorizationHeader {
    headers: {
        Authorization: string
    }
}

export interface UserItem {
    id: string,
    firstName: string,
    lastName: string,
    email: string
}

export class UserService {

    public static async login(email: string, password: string): Promise<AxiosResponse> {
        return axios.post(configVals.root + configVals.login, {
            "email": email,
            "password": password
        });
    }

    public static async register(name: string, email: string, password: string): Promise<AxiosResponse> {
        return axios.post(configVals.root + configVals.register, {
            "name": name,
            "email": email,
            "password": password
        });
    }

    public static logout(): void {
        window.localStorage.removeItem("appState");
    }

    public static getUserId(): string {
        return window.localStorage.getItem("user_id");
    }

    private static setUserId(): void {
        var token: string = this.getToken();
        var decoded: { user_id: string } = JwtDecode(token);
        window.localStorage.setItem("user_id", decoded.user_id);
    }

    public static isLoggedIn(): boolean {
        return this.getUserId() != null;
    }

    public static getToken(): string {
        return window.localStorage.getItem("token");
    }

    public static saveToken(token: string): void {
        window.localStorage.setItem("token", token);
        this.setUserId();
    }

    public static getAuthenticationHeader(): authorizationHeader {
        return {
            headers: {
                Authorization: `Bearer ${UserService.getToken()}`
            }
        }
    }
}
