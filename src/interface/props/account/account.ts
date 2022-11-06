import {Dispatch, SetStateAction} from "react";

export interface AccountItemProps {
    index: number
    accountName: string
    totalAmount: number
    invisibleAmount: number
    order: number
    reloadAccountList: Function
    isLast: boolean
    setLastElement: Dispatch<SetStateAction<HTMLDivElement | null>>
}