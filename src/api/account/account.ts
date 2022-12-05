import {AxiosResponse} from "axios";
import {CursorSelectQueryDto} from "../../interface/dto/common";
import {callApi} from "../../utils/axios";
import {
    CreateAccountDto,
    SelectAccountMonthSummaryDto,
    UpdateAccountDto
} from "../../interface/dto/account/account";

export const selectAccountApi = async (payload: CursorSelectQueryDto): Promise<AxiosResponse | undefined> => {
    return await callApi<CursorSelectQueryDto>('get', 'account', payload);
}

export const selectOneAccountApi = async (accountIdx: number): Promise<AxiosResponse | undefined> => {
    return await callApi('get', `account/${accountIdx}`);
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

export const selectMonthSummaryDataApi = async (
    payload: SelectAccountMonthSummaryDto
): Promise<AxiosResponse | undefined> => {
    return await callApi('get', `account/monthSummary`, payload);
}