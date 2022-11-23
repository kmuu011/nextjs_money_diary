import {AxiosResponse} from "axios";
import {callApi} from "../../../utils/axios";
import {
    CreateAccountHistoryCategoryDto,
    SelectAccountHistoryCategoryDto, UpdateAccountHistoryCategoryDto
} from "../../../interface/dto/account/history/category";

export const selectAccountHistoryCategoryApi = async (
    payload: SelectAccountHistoryCategoryDto
): Promise<AxiosResponse | undefined> => {
    return await callApi<SelectAccountHistoryCategoryDto>('get', `account/history/category`, payload);
};

export const createAccountHistoryCategoryApi = async (
    payload: CreateAccountHistoryCategoryDto
): Promise<AxiosResponse | undefined> => {
    return await callApi<CreateAccountHistoryCategoryDto>('post', `account/history/category`, payload);
};

export const updateAccountHistoryCategoryApi = async (
    categoryIdx: number,
    payload: UpdateAccountHistoryCategoryDto
): Promise<AxiosResponse | undefined> => {
    return await callApi<UpdateAccountHistoryCategoryDto>(
        'patch',
        `account/history/category/${categoryIdx}`, payload
    );
}

export const deleteAccountHistoryCategoryApi = async (
    categoryIdx: number
): Promise<AxiosResponse | undefined> => {
    return await callApi(
        'delete',
        `account/history/category/${categoryIdx}`
    );
}