export interface SelectAccountHistoryDto {
    page: number
    count: number
    accountHistoryCategoryIdx?: number
}

export interface CreateAccountHistoryDto {
    amount: number
    content: string
    type: string
    accountHistoryCategoryIdx: number
    createdAt?: string
}

export interface UpdateAccountHistoryDto {
    amount: number
    content: string
    type: string
    accountHistoryCategoryIdx: number
    createdAt?: string
}