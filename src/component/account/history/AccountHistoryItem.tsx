import {FunctionComponent, useEffect, useState} from "react";
import * as styles from "../../../../styles/account/history/History.style";
import {AccountHistoryItemProps} from "../../../interface/props/account/history/history";
import {commaParser, dateToObject} from "../../../utils/utils";
import {useRecoilState, useSetRecoilState} from "recoil";
import {
    accountHistoryModalTypeAtom,
    selectedAccountHistoryInfoAtom, 
    showAccountHistoryDataModalAtom,
    updatedAccountHistoryIdxAtom
} from "../../../recoil/atoms/account/history";
import {useRouter} from "next/router";
import {selectOneAccountHistoryApi} from "../../../api/account/history/history";
import {DateObjectType} from "../../../interface/type/common";

const AccountHistoryItem: FunctionComponent<AccountHistoryItemProps> = (
    {
        accountHistoryInfo,
        isLast,
        setLastElement,
    }
) => {
    const accountIdx: number = Number(useRouter().query.accountIdx);

    const [
        accountHistoryData,
        setAccountHistoryData
    ] = useState(accountHistoryInfo);

    const [type, setType] = useState<number>(accountHistoryData.type);
    const [amount, setAmount] = useState<number>(accountHistoryData.amount);
    const [content, setContent] = useState<string>(accountHistoryData.content);
    const [categoryName, setCategoryName] = useState<string>(accountHistoryData.accountHistoryCategory.name);
    const [dateObj, setDateObj] = useState<DateObjectType>(dateToObject(new Date(accountHistoryData.createdAt)));

    const [
        showAccountHistoryDataModal,
        setShowAccountHistoryUpdateModal
    ] = useRecoilState(showAccountHistoryDataModalAtom);

    const setModalType = useSetRecoilState(accountHistoryModalTypeAtom);

    const setSelectedAccountHistoryInfo = useSetRecoilState(selectedAccountHistoryInfoAtom);

    const openAccountUpdateModal = (): void => {
        setModalType(1);
        setSelectedAccountHistoryInfo(accountHistoryData);
        setShowAccountHistoryUpdateModal(!showAccountHistoryDataModal);
    };

    const [
        updatedAccountHistoryIdx,
        setUpdatedAccountHistoryIdx
    ] = useRecoilState(updatedAccountHistoryIdxAtom);

    const selectOneAccountHistory = async () => {
        const response = await selectOneAccountHistoryApi(
            accountHistoryInfo.account.idx,
            accountHistoryInfo.idx
        );

        if (response?.status !== 200) {
            alert(response?.data?.message);
            return;
        }

        const {
            type, amount, content, accountHistoryCategory, createdAt
        } = response.data;

        setType(type);
        setAmount(amount);
        setContent(content);
        setCategoryName(accountHistoryCategory.name);
        setDateObj(dateToObject(new Date(createdAt)));
        setUpdatedAccountHistoryIdx(0);

        setAccountHistoryData(response.data);
    };

    useEffect(() => {
        if (updatedAccountHistoryIdx !== accountHistoryInfo.idx) return;

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
