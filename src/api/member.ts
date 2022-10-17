import {DuplicateCheckDto, LoginDto, SignUpDto, UpdateMemberInfoDto} from "../interface/dto/member";
import {callApi} from "../utils/axios";
import {AxiosResponse} from "axios";

export const loginApi = async (payload: LoginDto): Promise<AxiosResponse | undefined> => {
    return await callApi<LoginDto>('post', 'member/login', payload);
}

export const signUpApi = async (payload: SignUpDto): Promise<AxiosResponse | undefined> => {
    return await callApi<SignUpDto>('post', 'member/signUp', payload)
}

export const duplicateCheckApi = async (payload: DuplicateCheckDto): Promise<AxiosResponse | undefined> => {
    return await callApi<DuplicateCheckDto>('get', 'member/duplicateCheck', payload)
}

export const tokenCheck = async (): Promise<AxiosResponse | undefined> => {
    return await callApi('post', 'member/auth');
}

export const logout = async (): Promise<void> => {
    localStorage.removeItem('token-code');
    window.location.href = '/';
}

export const updateProfileImageApi = async (payload: FormData): Promise<AxiosResponse | undefined> => {
    return await callApi('patch', 'member/img', payload);
}

export const deleteProfileImageApi = async (): Promise<AxiosResponse | undefined> => {
    return await callApi('delete', 'member/img');
}

export const updateMemberInfoApi = async (payload: UpdateMemberInfoDto): Promise<AxiosResponse | undefined> => {
    return await callApi('patch', 'member', payload);
}

