import {FunctionComponent, useState} from "react";
import * as styles from "../../../../styles/account/history/History.style";
import Link from "next/link";
import moreImage from "../../../public/static/button/more/more.svg";
import confirmImage from "../../../public/static/button/confirm/confirm.svg";
import cancelImage from "../../../public/static/button/cancel/cancel.svg";
import Image from "next/image";
import {AccountHistoryItemProps} from "../../../interface/props/account/history/history";
import {commaParser, dateToObject} from "../../../utils/utils";
import {useRecoilState, useSetRecoilState} from "recoil";
import {
    selectedAccountHistoryInfoAtom,
    showAccountHistoryUpdateModalAtom
} from "../../../recoil/atoms/account/history";

const AccountHistoryItem: FunctionComponent<AccountHistoryItemProps> = (
    {
        accountHistoryInfo,
        isLast,
        setLastElement,
    }
) => {
    const [showMore, setShowMore] = useState(false);
    const dateObj = dateToObject(new Date(accountHistoryInfo.createdAt));
    const [
        showAccountHistoryUpdateModal,
        setShowAccountHistoryUpdateModal
    ] = useRecoilState(showAccountHistoryUpdateModalAtom);

    const setAccountHistoryInfo = useSetRecoilState(selectedAccountHistoryInfoAtom);

    const showMoreMenu = (): void => {
        setShowMore(true);
    }

    const openAccountUpdateModal = (): void => {
        setAccountHistoryInfo(accountHistoryInfo);
        setShowAccountHistoryUpdateModal(!showAccountHistoryUpdateModal);
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
            css={styles.accountHistoryItem}
            ref={isLast ? setLastElement : null}
            onClick={openAccountUpdateModal}
        >
            <div css={styles.historyDate}>
                {`${dateObj.year}.${dateObj.month}.${dateObj.date} 
                (${dateObj.dayStr})
                ${dateObj.hour}:${dateObj.minute}`}
            </div>

            <div css={styles.historyInfoWrap}>
                <div css={styles.leftInfo}>
                    <div css={styles.categoryName}>
                        {accountHistoryInfo.accountHistoryCategory.name}
                    </div>
                    <div>{accountHistoryInfo.content}</div>
                </div>
                <div css={styles.rightInfo}>
                    <div css={styles.historyContent(accountHistoryInfo.type)}>
                        {commaParser(accountHistoryInfo.amount, accountHistoryInfo.type)}원
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AccountHistoryItem
