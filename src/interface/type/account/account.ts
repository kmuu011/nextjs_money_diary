export interface AccountItemType {
    idx: number
    accountName: string
    totalAmount: number
    invisibleAmount: number
    order: number
    createdAt: string
    updatedAt: string
    checked?: boolean
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

export interface AccountCategoryCostSummaryType {
    accountHistoryCategoryIdx: number
    amount: number
    categoryName: string
    color: string
    percent?: string
}

export interface AccountCategorySummaryChartType {
    id: string
    label: string
    value: string
    color: string
    categoryIdx: number
    amount?: number
}
