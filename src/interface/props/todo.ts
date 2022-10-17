export interface TodoItemProps {
    preview?: boolean
    todoGroupIdx: number
    index: number
    content: string
    completedAt: string
    reloadTodoList?: Function
}