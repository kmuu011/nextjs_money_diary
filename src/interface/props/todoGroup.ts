import {TodoItemType} from "../type/todo";

export interface TodoGroupItemProps {
    index: number
    title: string
    todoList: TodoItemType[]
    updatedAt: string
    reloadTodoGroupList: Function
}