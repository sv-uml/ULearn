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
        window.localStorage.removeItem("state");
    }
}
