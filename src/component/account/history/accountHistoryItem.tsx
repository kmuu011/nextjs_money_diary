import {FunctionComponent, useState} from "react";
import * as styles from "../../../../styles/account/history/History.style";
import Link from "next/link";
import moreImage from "../../../public/static/button/more/more.svg";
import confirmImage from "../../../public/static/button/confirm/confirm.svg";
import cancelImage from "../../../public/static/button/cancel/cancel.svg";
import Image from "next/image";
import {AccountHistoryItemProps} from "../../../interface/props/account/history/history";

const AccountHistoryItem: FunctionComponent<AccountHistoryItemProps> = (
    {
        idx, amount, content,
        type, createdAt,
        accountHistoryCategory
    }
) => {
    const [showMore, setShowMore] = useState(false);

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
                {amount}
            </div>
            <div>
                {content}
            </div>
            <div>
                {accountHistoryCategory.name}
            </div>
            {/*<Link href={`/accountHistory/${index}`}>*/}
            {/*</Link>*/}

        </div>
    )
}

export default AccountHistoryItem
