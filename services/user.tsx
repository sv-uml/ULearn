import * as JwtDecode from "jwt-decode";
import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";
import { configVals } from "./config";
import { InvalidIdError } from "./exception";

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

    /**
     * Attempt user authentication based on given email and password
     * @param email     Email to use for logging in.
     * @param password  Password to use for logging in.
     * @returns         Promise of type `AxiosResponse` containing the JWT authorization token.
     */
    public static async login(email: string, password: string): Promise<AxiosResponse> {
        return axios.post(configVals.root + "/api/login", {
            "email": email,
            "password": password
        });
    }

    /**
     * Register user based on first name, last name, email and password
     * @param name      Name
     * @param email     Email of user
     * @param password  Password
     * @returns         Promise of type `AxiosResponse` containing the name, password, email, user id and active status
     */
    public static async register(name: string, email: string, password: string): Promise<AxiosResponse> {
        return axios.post(configVals.root + "/api/register", {
            "name": name,
            "email": email,
            "password": password
        });
    }

    /**
     * Logout user
     */
    public static logout(): void {
        window.localStorage.removeItem("user_id");
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("appState");
    }

    /**
     * Get ID of currently logged-in user.
     * @returns         ID of currently logged-in user
     */
    public static getUserId(): string {
        return window.localStorage.getItem("user_id");
    }

    /**
     * Parse JWT authentication token and set ID of currently logged-in user.
     */
    private static setUserId(): void {
        var token: string = this.getToken();
        var decoded: { user_id: string } = JwtDecode(token);
        window.localStorage.setItem("user_id", decoded.user_id);
    }

    /**
     * Check if user is currently logged-in.
     * @returns         True if logged-in, false otherwise.
     */
    public static isLoggedIn(): boolean {
        return this.getUserId() != null;
    }

    /**
     * Get current JWT authorization token
     * @returns         JWT authorization token
     */
    public static getToken(): string {
        return window.localStorage.getItem("token");
    }

    /**
     * Save JWT authorization token into local storage.
     * @param token     JWT authorization token
     */
    public static saveToken(token: string): void {
        window.localStorage.setItem("token", token);
        this.setUserId();
    }

    /**
     * Get JWT token authorization-formatted header string.
     * @returns         Header object with formatted authorization string.
     */
    public static getAuthenticationHeader(): authorizationHeader {
        return {
            headers: {
                Authorization: `Bearer ${UserService.getToken()}`
            }
        }
    }
}
