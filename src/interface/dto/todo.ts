export interface CreateTodoDto {
    content: string
}

export interface UpdateTodoDto {
    content?: string
    complete?: boolean
}