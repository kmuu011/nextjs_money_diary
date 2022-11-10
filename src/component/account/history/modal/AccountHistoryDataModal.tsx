import {FunctionComponent, useEffect, useState} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";

import {
    accountHistoryModalTypeAtom, createdAccountHistoryInfoAtom, deletedAccountHistoryIdxAtom,
    selectedAccountHistoryInfoAtom,
    showAccountHistoryDataModalAtom,
    updatedAccountHistoryIdxAtom
} from "../../../../recoil/atoms/account/history";
import {cancelButton, deleteButton, modalBackground} from "../../../../../styles/common/Common.style";
import * as styles from "../../../../../styles/account/history/InsertModal.style";
import {AccountHistoryCategoryItemType} from "../../../../interface/type/account/history/category";
import {selectAccountHistoryCategoryApi} from "../../../../api/account/history/category";
import {
    createAccountHistoryApi,
    deleteAccountHistoryApi,
    updateAccountHistoryApi
} from "../../../../api/account/history/history";
import {useRouter} from "next/router";
import {toDateParser} from "../../../../utils/utils";
import {AccountHistoryItemType} from "../../../../interface/type/account/history/history";

const AccountHistoryDataModal: FunctionComponent<{
    reloadAccountInfo: Function,
    reloadAccountHistoryList: Function
}> = (
    {
        reloadAccountInfo,
        reloadAccountHistoryList
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

    const [type, setType] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<number>(0);
    const [categoryList, setCategoryList] = useState<AccountHistoryCategoryItemType[]>([]);
    const [createdAt, setCreatedAt] = useState<string>(toDateParser());

    const getCategoryList = async () => {
        const response = await selectAccountHistoryCategoryApi({type});

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setCategoryList(response.data);
        setCategory(response.data[0].idx);
    };

    const validation = () => {
        if (amount < 1) {
            alert('금액을 정확히 입력해주세요.');
            return;
        }

        if (content.replace(/\s/g, '') === '') {
            alert('내용을 입력해주세요.');
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
        if(!validation()) return;

        const response = await createAccountHistoryApi(
            accountIdx,
            {
                amount,
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
                amount,
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
        setCategory(0);
        setContent('');
        setCreatedAt(toDateParser());
    }

    useEffect(() => {
        getCategoryList()
    }, [type]);

    useEffect(() => {
        setType(selectedAccountHistoryInfo?.type || 0);
        setAmount(selectedAccountHistoryInfo?.amount || 0);
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
                css={styles.accountHistoryInsertWrap(showAccountHistoryDataModal)}
                id={"accountInsertModal"}
            >
                <div css={styles.accountHistoryInsertBody(showAccountHistoryDataModal, modalType)}>
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
                            onClick={() => setType(0)}
                        >
                            지출
                        </div>
                        <div
                            css={styles.outcomeType(type === 1)}
                            onClick={() => setType(1)}
                        >
                            수입
                        </div>
                    </div>
                    <div css={styles.categoryWrap}>
                        <select
                            value={category}
                            onChange={(e) => {
                                setCategory(Number(e.target.value))
                            }}
                        >
                            <option
                                value={0} key={0}
                            >
                                카테고리
                            </option>
                            {
                                categoryList.map(c => {
                                    return <option
                                        value={c.idx} key={c.idx}
                                    >
                                        {c.name}
                                    </option>
                                })
                            }
                        </select>
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
