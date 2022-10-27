import {FunctionComponent, useState} from "react";
import * as styles from "../../../../styles/account/history/History.style";
import Link from "next/link";
import moreImage from "../../../public/static/button/more/more.svg";
import confirmImage from "../../../public/static/button/confirm/confirm.svg";
import cancelImage from "../../../public/static/button/cancel/cancel.svg";
import Image from "next/image";
import {AccountHistoryItemProps} from "../../../interface/props/account/history/history";
import {dateToObject} from "../../../utils/utils";

const AccountHistoryItem: FunctionComponent<AccountHistoryItemProps> = (
    {
        idx, amount, content,
        type, createdAt,
        accountHistoryCategory
    }
) => {
    const [showMore, setShowMore] = useState(false);
    const dateObj = dateToObject(new Date(createdAt));

    const showMoreMenu = (): void => {
        setShowMore(true)
    }
    // const updateAccountHistory = async (): Promise<void> => {
    //     const response = await updateAccountHistoryApi(
    //         index,
    //         {
    //             accountHistoryName: getAccountHistoryName,
    //             invisibleAmount,
    //             order
    //         }
    //     );
    //
    //     if (response?.status !== 200) {
    //         alert(response?.data.message);
    //         return;
    //     }
    //
    //     setModifyMode(false);
    //     reloadAccountHistoryList(undefined, true);
    // }
    //
    // const deleteAccountHistory = async (): Promise<void> => {
    //     const response = await deleteAccountHistoryApi(index);
    //
    //     if (response?.status !== 200) {
    //         alert(response?.data.message);
    //         return;
    //     }
    //
    //     setModifyMode(false);
    //     reloadAccountHistoryList(undefined, true);
    // }

    return (
        <div
            className={styles.accountHistoryItem}
        >
            <div>
                {`${dateObj.year}.${dateObj.month}.${dateObj.date} 
                (${dateObj.dayStr})
                ${dateObj.hour}:${dateObj.minute}`}
            </div>
            <div className={styles.historyInfoWrap}>
                <div className={styles.leftInfo}>
                    <div>{accountHistoryCategory.name}</div>
                    <div>{content}</div>
                </div>
                <div className={styles.rightInfo}>
                    <div>{amount}</div>
                </div>
            </div>
            {/*<Link href={`/accountHistory/${index}`}>*/}
            {/*</Link>*/}

        </div>
    )
}

export default AccountHistoryItem
