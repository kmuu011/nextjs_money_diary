import {AxiosResponse} from "axios";
import {callApi} from "../../../utils/axios";
import {SelectAccountHistoryCategoryDto} from "../../../interface/dto/account/history/category";

export const selectAccountHistoryCategoryApi = async (
    payload: SelectAccountHistoryCategoryDto
): Promise<AxiosResponse | undefined> => {
    return await callApi<SelectAccountHistoryCategoryDto>('get', `account/history/category`, payload);
}
