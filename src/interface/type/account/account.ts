export interface AccountItemType {
    idx: number
    accountName: string
    totalAmount: number
    invisibleAmount: number
    order: number
    createdAt: string
    updatedAt: string
}

export interface AccountDailyCostSummaryType {
    date: string
    outcome: number
    income: number
}

export interface AccountMonthCostSummaryType {
    outcome: number
    income: number
}