import { AxiosError } from "axios";
import api from "../lib/api";
import { LoginType, SignupFormType} from "../lib/validations/auth.validation";

export const loginUser = async(credentials: LoginType)=>{
    try{
        const response = await api.post("/auth/login", credentials);
        return response?.data;
    }catch(error){
        if(error instanceof AxiosError){
            throw new Error(error?.response?.data.message);
        }
        throw new Error("Something went wrong");
    }
}

export const registerUser = async(data: SignupFormType)=>{
    try{
        console.log(data)
        const response = await api.post("/auth/register", data);
        return response?.data;
    }catch(error){
        if(error instanceof AxiosError){
            throw new Error(error?.response?.data.message);
        }
        throw new Error("Something went wrong");
    }
}

export const logoutUser = async () => {
    try {
        const response = await api.post("/auth/logout");
        return response?.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data?.message || "Logout failed");
        }
        throw new Error("Something went wrong");
    }
};

