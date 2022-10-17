import {callApi} from "../utils/axios";
import {AxiosResponse} from "axios";
import {SelectQueryDto} from "../interface/dto/common";
import {CreateTodoDto, UpdateTodoDto} from "../interface/dto/todo";

export const selectTodoApi = async (todoGroupIdx: number, payload: SelectQueryDto): Promise<AxiosResponse | undefined> => {
    return await callApi<SelectQueryDto>('get', `todoGroup/${todoGroupIdx}/todo`, payload);
}

export const createTodoApi = async (todoGroupIdx: number, payload: CreateTodoDto): Promise<AxiosResponse | undefined> => {
    return await callApi<CreateTodoDto>('post', `todoGroup/${todoGroupIdx}/todo`, payload);
}

export const updateTodoApi = async (
    todoGroupIdx: number,
    todoIdx: number,
    payload: UpdateTodoDto
): Promise<AxiosResponse | undefined> => {
    return await callApi<UpdateTodoDto>('patch', `todoGroup/${todoGroupIdx}/todo/${todoIdx}`, payload);
}

export const deleteTodoApi = async (
    todoGroupIdx: number,
    todoIdx: number
) => {
    return await callApi('delete', `todoGroup/${todoGroupIdx}/todo/${todoIdx}`);
}