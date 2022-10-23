export interface CreateAccountDto {
    accountName: string
}

export interface UpdateAccountDto {
    accountName: string
    order: number
    invisibleAmount: number
}