import { AxiosResponse } from "axios"
import $api from "../api";
import { AuthResponce } from "../models/response/AuthResponce";

export default class AuthService {
    static async login(email: string, password :string) : Promise<AxiosResponse<AuthResponce>> {
        return  $api.post<AuthResponce>("/login",  { email, password })
    }

    static async registration(email: string, password :string) : Promise<AxiosResponse<AuthResponce>> {
        return  $api.post<AuthResponce>("/registration",  { email, password })
    }

    static async logout() : Promise<void> {
        $api.post('/logout')
    }
}