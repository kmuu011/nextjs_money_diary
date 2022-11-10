import {FunctionComponent, useEffect, useState} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";

import {
    accountHistoryModalTypeAtom,
    selectedAccountHistoryInfoAtom,
    showAccountHistoryDataModalAtom,
    updatedAccountHistoryIdxAtom
} from "../../../../recoil/atoms/account/history";
import {modalBackground} from "../../../../../styles/common/Common.style";
import * as styles from "../../../../../styles/account/history/InsertModal.style";
import {AccountHistoryCategoryItemType} from "../../../../interface/type/account/history/category";
import {selectAccountHistoryCategoryApi} from "../../../../api/account/history/category";
import {createAccountHistoryApi, updateAccountHistoryApi} from "../../../../api/account/history/history";
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
        showAccountHistoryInsertModal,
        setShowAccountHistoryInsertModal
    ] = useRecoilState(showAccountHistoryDataModalAtom);

    const modalType = useRecoilValue(accountHistoryModalTypeAtom);

    const selectedAccountHistoryInfo: AccountHistoryItemType = useRecoilValue(selectedAccountHistoryInfoAtom);
    const setUpdatedAccountHistoryIdx = useSetRecoilState(updatedAccountHistoryIdxAtom);

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
    }

    const insertAccountHistory = async () => {
        validation();

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
        await reloadAccountHistoryList(false, true);

        initialSetter();

        if (response?.status === 201) {
            setShowAccountHistoryInsertModal(false);
        }
    }

    const accountHistoryUpdate = async () => {
        validation();

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

        await reloadAccountInfo();

        if(response?.status === 200){
            setShowAccountHistoryInsertModal(false);
            setUpdatedAccountHistoryIdx(selectedAccountHistoryInfo.idx);
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
        <div css={modalBackground(showAccountHistoryInsertModal)}
             onClick={(e) => {
                 const element: HTMLDivElement = e.target as HTMLDivElement;

                 if (element.id === 'accountInsertModal') {
                     setShowAccountHistoryInsertModal(false);
                 }
             }}>
            <div
                css={styles.accountHistoryInsertWrap(showAccountHistoryInsertModal)}
                id={"accountInsertModal"}
            >
                <div css={styles.accountHistoryInsertBody(showAccountHistoryInsertModal)}>
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
                                <button
                                    onClick={accountHistoryUpdate}
                                >
                                    수정하기
                                </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountHistoryDataModal;
