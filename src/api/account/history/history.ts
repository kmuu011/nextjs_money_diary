import {AxiosResponse} from "axios";
import {CursorSelectQueryDto} from "../../../interface/dto/common";
import {callApi} from "../../../utils/axios";
import {
    CreateAccountHistoryDto, SelectAccountHistoryDto,
    UpdateAccountHistoryDto
} from "../../../interface/dto/account/history/history";

export const selectAccountHistoryApi = async (
    payload: SelectAccountHistoryDto,
): Promise<AxiosResponse | undefined> => {
    return await callApi<CursorSelectQueryDto>('get', `account/history`, payload);
}

export const createAccountHistoryApi = async (
    accountIdx: number,
    payload: CreateAccountHistoryDto
): Promise<AxiosResponse | undefined> => {
    return await callApi<CreateAccountHistoryDto>('post', `account/${accountIdx}/history`, payload)
}

export const updateAccountHistoryApi = async (
    accountIdx: number,
    accountHistoryIdx: number,
    payload: UpdateAccountHistoryDto
): Promise<AxiosResponse | undefined> => {
    return await callApi<UpdateAccountHistoryDto>('patch', `account/${accountIdx}/history/${accountHistoryIdx}`, payload);
}

export const selectOneAccountHistoryApi = async (
    accountIdx: number,
    accountHistoryIdx: number,
): Promise<AxiosResponse | undefined> => {
    return await callApi('get', `account/${accountIdx}/history/${accountHistoryIdx}`);
}

export const deleteAccountHistoryApi = async (
    accountIdx: number,
    accountHistoryIdx: number
): Promise<AxiosResponse | undefined> => {
    return await callApi('delete', `account/${accountIdx}/history/${accountHistoryIdx}`);
}