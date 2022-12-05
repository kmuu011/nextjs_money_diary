export interface CalendarDateDataType<T> {
    isToday: boolean
    isThisMonth: boolean
    year: string
    month: string
    date: string
    data?: T | undefined
}