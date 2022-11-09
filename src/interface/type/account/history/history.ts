import {AccountHistoryCategoryItemType} from "./category";

export interface AccountHistoryItemType {
    idx: number
    accountHistoryCategory: AccountHistoryCategoryItemType
    amount: number
    content: string
    type: number
    createdAt: Date
    updatedAt: Date
}