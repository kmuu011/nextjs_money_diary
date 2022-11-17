import {FunctionComponent, useEffect, useState} from "react";
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";

import {
    accountHistoryCategoryAtom,
    accountHistoryModalTypeAtom, accountHistoryTypeAtom, createdAccountHistoryInfoAtom, deletedAccountHistoryIdxAtom,
    selectedAccountHistoryInfoAtom,
    showAccountHistoryDataModalAtom,
    updatedAccountHistoryIdxAtom
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

const AccountHistoryDataModal: FunctionComponent<{
    reloadAccountInfo: Function,
}> = (
    {
        reloadAccountInfo,
    }
) => {
    const accountIdx: number = Number(useRouter().query.accountIdx);

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
    const setDeletedAccountHistoryIdx = useSetRecoilState(deletedAccountHistoryIdxAtom);

    const [type, setType] = useRecoilState(accountHistoryTypeAtom);
    const [amount, setAmount] = useState<number | string>('');
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useRecoilState(accountHistoryCategoryAtom);
    const resetCategory = useResetRecoilState(accountHistoryCategoryAtom);
    const [createdAt, setCreatedAt] = useState<string>(toDateParser());

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
        //             createdAt
        //         })
        // }
        // return;

        if(!validation()) return;

        const response = await createAccountHistoryApi(
            accountIdx,
            {
                amount: Number(amount),
                content,
                type,
                accountHistoryCategoryIdx: category,
                createdAt
            }
        );

        await reloadAccountInfo();

        initialSetter();

        if (response?.status === 201) {
            setShowAccountHistoryDataModal(false);
            setCreatedAccountHistoryInfo(response.data);
        }
    }

    const accountHistoryUpdate = async () => {
        if(!validation()) return;

        const response = await updateAccountHistoryApi(
            accountIdx,
            selectedAccountHistoryInfo.idx,
            {
                amount: Number(amount),
                type,
                content,
                accountHistoryCategoryIdx: category,
                createdAt
            }
        );

        if (response?.status === 200) {
            await reloadAccountInfo();
            setShowAccountHistoryDataModal(false);
            setUpdatedAccountHistoryIdx(selectedAccountHistoryInfo.idx);
        }
    }

    const accountHistoryDelete = async () => {
        const response = await deleteAccountHistoryApi(
            accountIdx,
            selectedAccountHistoryInfo.idx
        );

        if(response?.status === 200) {
            await reloadAccountInfo();
            setDeletedAccountHistoryIdx(selectedAccountHistoryInfo.idx);
            setShowAccountHistoryDataModal(false);
            setShowDelete(false);
        }
    }

    const initialSetter = (): void => {
        setType(0);
        setAmount(0);
        resetCategory();
        setContent('');
        setCreatedAt(toDateParser());
    }

    useEffect(() => {
        setType(selectedAccountHistoryInfo?.type || 0);
        setAmount(selectedAccountHistoryInfo?.amount || '');
        setContent(selectedAccountHistoryInfo?.content || '');
        setCategory(selectedAccountHistoryInfo?.accountHistoryCategory.idx || 0);
        setCreatedAt(toDateParser(selectedAccountHistoryInfo?.createdAt || toDateParser()));

    }, [selectedAccountHistoryInfo]);

    return (
        <div css={modalBackground(showAccountHistoryDataModal)}
             onClick={(e) => {
                 const element: HTMLDivElement = e.target as HTMLDivElement;

                 if (element.id === 'accountInsertModal') {
                     setShowAccountHistoryDataModal(false);
                 }
             }}>
            <div
                css={styles.accountHistoryDataWrap}
                id={"accountInsertModal"}
            >
                <div css={styles.accountHistoryDataBody(showAccountHistoryDataModal, modalType)}>
                    <div>
                        <input
                            placeholder={"금액"}
                            value={amount}
                            type={"number"}
                            onChange={(e) => setAmount(parseInt(e.target.value))}
                        />
                    </div>
                    <div css={styles.typeWrap}>
                        <div
                            css={styles.incomeType(type === 0)}
                            onClick={() => {
                                setType(0);
                                resetCategory();
                            }}
                        >
                            지출
                        </div>
                        <div
                            css={styles.outcomeType(type === 1)}
                            onClick={() => {
                                setType(1);
                                resetCategory();
                            }}
                        >
                            수입
                        </div>
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
