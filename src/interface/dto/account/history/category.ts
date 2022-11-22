export interface SelectAccountHistoryCategoryDto {
    type: number
}

export interface CreateAccountHistoryCategoryDto {
    type: number
    name: string
}

export interface UpdateAccountHistoryCategoryDto {
    name?: string
    color?: string
    order?: number
}