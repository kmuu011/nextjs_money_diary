import {FunctionComponent, useEffect, useState} from "react";
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";

import {
    accountHistoryCategoryAtom,
    accountHistoryModalTypeAtom,
    accountHistoryTypeAtom,
    createdAccountHistoryInfoAtom,
    dateForSelectAccountHistoryAtom,
    deletedAccountHistoryIdxAtom,
    selectedAccountHistoryInfoAtom,
    showAccountHistoryDataModalAtom, updatedAccountHistoryAccountIdxAtom,
    updatedAccountHistoryIdxAtom,
} from "../../../../recoil/atoms/account/history";
import {cancelButton, deleteButton, modalBackground} from "../../../../../styles/common/Common.style";
import * as styles from "../../../../../styles/account/history/AccountHistoryDataModal.style";
import {
    createAccountHistoryApi,
    deleteAccountHistoryApi,
    updateAccountHistoryApi
} from "../../../../api/account/history/history";
import {useRouter} from "next/router";
import {toDateParser} from "../../../../utils/utils";
import {AccountHistoryItemType} from "../../../../interface/type/account/history/history";
import AccountHistoryCategorySelect from "../AccountHistoryCategorySelect";
import {selectAccountHistoryCategoryApi} from "../../../../api/account/history/category";
import AccountHistoryType from "../AccountHistoryType";
import AccountSelect from "../../AccountSelect";
import {selectedAccountIdxAtom} from "../../../../recoil/atoms/account/account";
import {monthForCalendarAtom, yearForCalendarAtom} from "../../../../recoil/atoms/calendar/calendar";

const AccountHistoryDataModal: FunctionComponent<{
    reloadAccountInfo?: Function,
    isHistoryList?: boolean,
    isCalendar?: boolean
}> = (
    {
        reloadAccountInfo,
        isHistoryList,
        isCalendar
    }
) => {
    const accountIdx: number = Number(useRouter().query.accountIdx);
    const selectedAccountIdx = useRecoilValue(selectedAccountIdxAtom);

    const [
        showDelete,
        setShowDelete
    ] = useState(false);
    const [
        showAccountHistoryDataModal,
        setShowAccountHistoryDataModal
    ] = useRecoilState(showAccountHistoryDataModalAtom);

    const modalType = useRecoilValue(accountHistoryModalTypeAtom);

    const selectedAccountHistoryInfo: AccountHistoryItemType = useRecoilValue(selectedAccountHistoryInfoAtom);
    const setCreatedAccountHistoryInfo = useSetRecoilState(createdAccountHistoryInfoAtom);
    const setUpdatedAccountHistoryIdx = useSetRecoilState(updatedAccountHistoryIdxAtom);
    const setUpdatedAccountHistoryAccountIdx = useSetRecoilState(updatedAccountHistoryAccountIdxAtom);
    const setDeletedAccountHistoryIdx = useSetRecoilState(deletedAccountHistoryIdxAtom);

    const yearForSelect = useRecoilValue(yearForCalendarAtom);
    const monthForSelect = useRecoilValue(monthForCalendarAtom);
    const dateForSelect = useRecoilValue(dateForSelectAccountHistoryAtom);

    const nowDate = toDateParser();

    const [type, setType] = useRecoilState(accountHistoryTypeAtom);
    const [amount, setAmount] = useState<number | string>('');
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useRecoilState(accountHistoryCategoryAtom);
    const resetCategory = useResetRecoilState(accountHistoryCategoryAtom);
    const [createdAt, setCreatedAt] = useState<string>(nowDate);

    const validation = () => {
        if (!amount || amount < 1) {
            alert('금액을 정확히 입력해주세요.');
            return;
        }

        if (category === 0) {
            alert('카테고리를 지정해주세요.');
            return;
        }

        if (isNaN(new Date(createdAt).getTime())) {
            alert('일자가 올바르지 않습니다.');
            return;
        }

        if (isCalendar && !selectedAccountIdx) {
            alert('가계부를 지정해주세요.');
            return;
        }

        return true;
    }

    const insertAccountHistory = async () => {
        // const categoryList = [
        //     await selectAccountHistoryCategoryApi({type:0}),
        //     await selectAccountHistoryCategoryApi({type:1})
        // ];
        // for(let i=0 ; i<100 ; i++){
        //     const type = Math.round(Math.random()*1);
        //
        //     const index = Math.floor(Math.random()*categoryList[type]?.data.length);
        //
        //     const categoryIdx = categoryList[type]?.data[index].idx;
        //
        //     await createAccountHistoryApi(accountIdx,
        //         {
        //             amount: Math.ceil(Math.random()*300000),
        //             content: '가계 내역' + (i+1),
        //             type,
        //             accountHistoryCategoryIdx: categoryIdx,
        //             // createdAt: '2022-12-' + (Math.round(Math.random()*30)+1).toString().padStart(2,'0') + 'T14:36'
        //             createdAt: '2022-12-02T14:36'
        //         })
        // }
        // return;

        if (!validation()) return;

        const response = await createAccountHistoryApi(
            (isCalendar ? selectedAccountIdx : accountIdx),
            {
                amount: Number(amount),
                content,
                type,
                accountHistoryCategoryIdx: category,
                createdAt
            }
        );

        if (response?.status !== 201) {
            alert(response?.data.message);
            return;
        }

        if (reloadAccountInfo) {
            await reloadAccountInfo();
        }

        initialSetter();
        setShowAccountHistoryDataModal(false);
        setCreatedAccountHistoryInfo(response.data);
    }

    const accountHistoryUpdate = async () => {
        if (!validation()) return;

        const payload: {
            amount: number,
            type: number,
            content: string,
            accountHistoryCategoryIdx: number,
            createdAt: string,
            accountIdx?: number
        } = {
            amount: Number(amount),
            type,
            content,
            accountHistoryCategoryIdx: category,
            createdAt,
        };

        if (selectedAccountIdx) {
            payload.accountIdx = selectedAccountIdx;
            setUpdatedAccountHistoryAccountIdx(payload.accountIdx);
        }

        const response = await updateAccountHistoryApi(
            selectedAccountHistoryInfo.account.idx,
            selectedAccountHistoryInfo.idx,
            payload
        );

        if (response?.status === 200) {
            if (reloadAccountInfo) {
                await reloadAccountInfo();
            }

            setUpdatedAccountHistoryIdx(selectedAccountHistoryInfo.idx);
            setShowAccountHistoryDataModal(false);
        }
    }

    const accountHistoryDelete = async () => {
        const response = await deleteAccountHistoryApi(
            selectedAccountHistoryInfo.account.idx,
            selectedAccountHistoryInfo.idx
        );

        if (response?.status === 200) {
            if (reloadAccountInfo) {
                await reloadAccountInfo();
            }

            setDeletedAccountHistoryIdx(selectedAccountHistoryInfo.idx);

            setShowAccountHistoryDataModal(false);
            setShowDelete(false);
        }
    }

    const initialSetter = (): void => {
        setType(0);
        setAmount('');
        resetCategory();
        setContent('');
        setCreatedAt(toDateParser());
    }

    useEffect(() => {
        setType(selectedAccountHistoryInfo?.type || 0);
        setAmount(selectedAccountHistoryInfo?.amount || '');
        setContent(selectedAccountHistoryInfo?.content || '');
        setCategory(selectedAccountHistoryInfo?.accountHistoryCategory.idx || 0);
        setCreatedAt(toDateParser(selectedAccountHistoryInfo?.createdAt ||
            (dateForSelect ?
                yearForSelect + '-' + monthForSelect + '-' + dateForSelect + nowDate.substring(nowDate.indexOf('T')) : undefined) ||
            toDateParser()));

    }, [selectedAccountHistoryInfo]);

    useEffect(() => {
        if (dateForSelect) {
            setCreatedAt(yearForSelect + '-' + monthForSelect + '-' + dateForSelect + nowDate.substring(nowDate.indexOf('T')))
        }
    }, [dateForSelect]);

    return (
        <div css={modalBackground(showAccountHistoryDataModal)}
             onClick={(e) => {
                 const element: HTMLDivElement = e.target as HTMLDivElement;

                 if (element.id === 'accountInsertModal') {
                     setShowAccountHistoryDataModal(false);
                     setShowDelete(false);
                 }
             }}>
            <div
                css={styles.accountHistoryDataWrap}
                id={"accountInsertModal"}
            >
                <div css={styles.accountHistoryDataBody(showAccountHistoryDataModal, modalType, isCalendar)}>
                    <div>
                        <input
                            placeholder={"금액"}
                            value={amount}
                            type={"number"}
                            onChange={(e) => setAmount(parseInt(e.target.value))}
                        />
                    </div>
                    <div css={styles.historyTypeWrap}>
                        <AccountHistoryType/>
                    </div>
                    <div css={styles.categoryWrap}>
                        <AccountHistoryCategorySelect/>
                    </div>

                    <div css={styles.contentInput}>
                        <textarea
                            placeholder={"내용"}
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                        />
                    </div>
                    <div css={styles.dateWrap}>
                        <input
                            type={"datetime-local"}
                            value={createdAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
                        />
                    </div>
                    {
                        isCalendar ?
                            <div css={styles.accountSelectWrap}>
                                <AccountSelect accountIdx={
                                    modalType === 0 ? undefined : selectedAccountHistoryInfo?.account?.idx}/>
                            </div>
                            :
                            <></>
                    }

                    <div
                        css={styles.buttonWrap}
                    >
                        {
                            modalType === 0 ?
                                <button
                                    onClick={insertAccountHistory}
                                >
                                    등록하기
                                </button> :
                                <div>
                                    <div>
                                        <button
                                            onClick={accountHistoryUpdate}
                                        >
                                            수정하기
                                        </button>
                                    </div>
                                    {
                                        !showDelete ?
                                            <div css={styles.deleteButtonWrap(showDelete)}>
                                                <button
                                                    onClick={() => setShowDelete(true)}
                                                >
                                                    삭제하기
                                                </button>
                                            </div>
                                            :
                                            <div css={styles.deleteButtonWrap(showDelete)}>
                                                <button
                                                    css={deleteButton}
                                                    onClick={accountHistoryDelete}
                                                >삭제
                                                </button>
                                                <button
                                                    css={cancelButton}
                                                    onClick={() => setShowDelete(false)}
                                                >취소
                                                </button>
                                            </div>
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountHistoryDataModal;
