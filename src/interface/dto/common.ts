export interface SelectQueryDto {
    page: number
    count: number
}

export interface CursorSelectQueryDto {
    startCursor: number
    endCursor?: number | undefined
    count?: number
}