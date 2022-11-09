import {FunctionComponent, useEffect, useState} from "react";
import * as styles from "../../../../styles/account/history/History.style";
import Link from "next/link";
import moreImage from "../../../public/static/button/more/more.svg";
import confirmImage from "../../../public/static/button/confirm/confirm.svg";
import cancelImage from "../../../public/static/button/cancel/cancel.svg";
import Image from "next/image";
import {AccountHistoryItemProps} from "../../../interface/props/account/history/history";
import {commaParser, dateToObject} from "../../../utils/utils";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
    selectedAccountHistoryInfoAtom,
    showAccountHistoryUpdateModalAtom, updatedAccountHistoryIdxAtom
} from "../../../recoil/atoms/account/history";
import {useRouter} from "next/router";
import {selectOneAccountHistoryApi} from "../../../api/account/history/history";
import {AccountHistoryCategoryItemType} from "../../../interface/type/account/history/category";
import {DateObjectType} from "../../../interface/type/common";

const AccountHistoryItem: FunctionComponent<AccountHistoryItemProps> = (
    {
        accountHistoryInfo,
        isLast,
        setLastElement,
    }
) => {
    const accountIdx: number = Number(useRouter().query.accountIdx);

    const [type, setType] = useState<number>(accountHistoryInfo.type);
    const [amount, setAmount] = useState<number>(accountHistoryInfo.amount);
    const [content, setContent] = useState<string>(accountHistoryInfo.content);
    const [categoryName, setCategoryName] = useState<string>(accountHistoryInfo.accountHistoryCategory.name);
    const [dateObj, setDateObj] = useState<DateObjectType>(dateToObject(new Date(accountHistoryInfo.createdAt)));

    const [
        showAccountHistoryUpdateModal,
        setShowAccountHistoryUpdateModal
    ] = useRecoilState(showAccountHistoryUpdateModalAtom);

    const setSelectedAccountHistoryInfo = useSetRecoilState(selectedAccountHistoryInfoAtom);

    const openAccountUpdateModal = (): void => {
        setSelectedAccountHistoryInfo(accountHistoryInfo);
        setShowAccountHistoryUpdateModal(!showAccountHistoryUpdateModal);
    };

    const [
        updatedAccountHistoryIdx,
        setUpdatedAccountHistoryIdx
    ] = useRecoilState(updatedAccountHistoryIdxAtom);

    const selectOneAccountHistory = async () => {
        const response = await selectOneAccountHistoryApi(
            accountIdx,
            accountHistoryInfo.idx
        );

        if(response?.status !== 200){
            alert(response?.data?.message);
            return;
        }

        setType(response.data.type);
        setAmount(response.data.amount);
        setContent(response.data.content);
        setCategoryName(response.data.accountHistoryCategory.name);
        setDateObj(dateToObject(new Date(response.data.createdAt)));
        setUpdatedAccountHistoryIdx(0);
    };

    useEffect(() => {
        if(updatedAccountHistoryIdx !== accountHistoryInfo.idx) return;

        selectOneAccountHistory();

    }, [updatedAccountHistoryIdx]);

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
                        {categoryName}
                    </div>
                    <div>{content}</div>
                </div>
                <div css={styles.rightInfo}>
                    <div css={styles.historyContent(type)}>
                        {commaParser(amount, type)}원
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AccountHistoryItem
