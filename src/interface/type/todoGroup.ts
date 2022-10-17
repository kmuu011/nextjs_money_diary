import {TodoItemType} from "./todo";

export interface TodoGroupItemType {
    idx: number
    title: string
    order: number
    todoList: TodoItemType[]
    createdAt: string
    updatedAt: string
}