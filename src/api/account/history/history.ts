import {AxiosResponse} from "axios";
import {SelectQueryDto} from "../../../interface/dto/common";
import {callApi} from "../../../utils/axios";
import {
    CreateAccountHistoryDto,
    UpdateAccountHistoryDto
} from "../../../interface/dto/account/history/history";

export const selectAccountHistoryApi = async (
    payload: SelectQueryDto,
    accountIdx: number
): Promise<AxiosResponse | undefined> => {
    return await callApi<SelectQueryDto>('get', `account/${accountIdx}/history`, payload);
}

export const createAccountHistoryApi = async (
    accountIdx: number,
    payload: CreateAccountHistoryDto
): Promise<AxiosResponse | undefined> => {
    return await callApi<CreateAccountHistoryDto>('post', `account/${accountIdx}/history`, payload)
}

export const updateAccountHistoryApi = async (
    accountIdx: number, payload: UpdateAccountHistoryDto
): Promise<AxiosResponse | undefined> => {
    return await callApi<UpdateAccountHistoryDto>('patch', `account/${accountIdx}/history/`, payload);
}

export const deleteAccountHistoryApi = async (accountIdx: number): Promise<AxiosResponse | undefined> => {
    return await callApi('delete', `account/${accountIdx}/history/`);
}