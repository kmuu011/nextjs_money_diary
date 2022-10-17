import {callApi} from "../utils/axios";
import {AxiosResponse} from "axios";
import {SelectQueryDto} from "../interface/dto/common";
import {CreateTodoGroupDto} from "../interface/dto/todoGroup";

export const selectTodoGroupApi = async (payload: SelectQueryDto): Promise<AxiosResponse | undefined> => {
    return await callApi<SelectQueryDto>('get', 'todoGroup', payload);
}

export const createTodoGroupApi = async (payload: CreateTodoGroupDto): Promise<AxiosResponse | undefined> => {
    return await callApi<CreateTodoGroupDto>('post', 'todoGroup', payload)
}

export const updateTodoGroupApi = async (
    todoGroupIdx: number, payload: CreateTodoGroupDto
): Promise<AxiosResponse | undefined> => {
    return await callApi<CreateTodoGroupDto>('patch', `todoGroup/${todoGroupIdx}`, payload);
}

export const deleteTodoGroupApi = async (todoGroupIdx: number): Promise<AxiosResponse | undefined> => {
    return await callApi('delete', `todoGroup/${todoGroupIdx}`);
}