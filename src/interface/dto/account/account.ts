export interface CreateAccountDto {
    accountName: string
}

export interface UpdateAccountDto {
    accountName?: string
    order?: number
    invisibleAmount?: number
}

export interface SelectAccountMonthSummaryDto {
    year: string
    month: string
    startDate: string
    endDate: string
    multipleAccountIdx?: string
}