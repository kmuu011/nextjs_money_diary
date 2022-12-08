export interface SelectAccountHistoryDto {
    startCursor: number
    endCursor?: number | undefined
    count: number
    multipleAccountIdx?: string
    type?: number
    multipleAccountHistoryCategoryIdx? :string
    date?: string
}

export interface CreateAccountHistoryDto {
    amount: number
    content: string
    type: number
    accountHistoryCategoryIdx: number
    createdAt?: string
}

export interface UpdateAccountHistoryDto {
    amount: number
    content: string
    type: number
    accountHistoryCategoryIdx: number
    createdAt?: string
}