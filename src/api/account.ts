import {AxiosResponse} from "axios";
import {SelectQueryDto} from "../interface/dto/common";
import {callApi} from "../utils/axios";
import {CreateAccountDto, UpdateAccountDto} from "../interface/dto/account";

export const selectAccountApi = async (payload: SelectQueryDto): Promise<AxiosResponse | undefined> => {
    return await callApi<SelectQueryDto>('get', 'account', payload);
}

export const createAccountApi = async (payload: CreateAccountDto): Promise<AxiosResponse | undefined> => {
    return await callApi<CreateAccountDto>('post', 'account', payload)
}

export const updateAccountApi = async (
    accountIdx: number, payload: UpdateAccountDto
): Promise<AxiosResponse | undefined> => {
    return await callApi<UpdateAccountDto>('patch', `account/${accountIdx}`, payload);
}

export const deleteAccountApi = async (accountIdx: number): Promise<AxiosResponse | undefined> => {
    return await callApi('delete', `account/${accountIdx}`);
}