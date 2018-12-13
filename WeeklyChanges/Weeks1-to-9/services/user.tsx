import * as React from "react";
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
        return axios.post(configVals.apiRoot + configVals.login, {
            auth: {
                "email": email,
                "password": password
            }
        });
    }

    /**
     * Register user based on first name, last name, email and password
     * @param firstName First name
     * @param lastName  Last name
     * @param email     Email of user
     * @param password  Password
     * @returns         Promise of type `AxiosResponse` containing the name, password, email, user id and active status
     */
    public static async register(firstName: string, lastName: string, email: string, password: string): Promise<AxiosResponse> {
        return axios.post(configVals.apiRoot + configVals.users, {
            user: {
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "password": password
            }
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

    /**
     * Retrieve information about a specific user.
     * @param id        Id of the user
     * @returns         `UserItem` object containing the user's first name, last name,
     *                  email and ID. If the user is not found or an error occurs,
     *                  a null object is returned.
     */
    public static async getUser(id: string): Promise<UserItem> {
        return axios.get(configVals.apiRoot + configVals.users + "/" + id, UserService.getAuthenticationHeader()).then(res => {
            if (res.status === 200) {
                return {
                    id: id,
                    firstName: res.data.first_name,
                    lastName: res.data.last_name,
                    email: res.data.email
                }
            }
        }).catch((ex: AxiosError) => {
            if (ex.response && ex.response.status === 404) {
                throw new InvalidIdError(id);
            } else {
                throw ex;
            }
        });
    }
}
