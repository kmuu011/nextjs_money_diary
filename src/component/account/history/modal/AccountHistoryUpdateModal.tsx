import {FunctionComponent, useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";

import {
    selectedAccountHistoryInfoAtom,
    showAccountHistoryUpdateModalAtom
} from "../../../../recoil/atoms/account/history";
import {modalBackground} from "../../../../../styles/common/Common.style";
import * as styles from "../../../../../styles/account/history/InsertModal.style";
import {AccountHistoryCategoryItemType} from "../../../../interface/type/account/history/category";
import {selectAccountHistoryCategoryApi} from "../../../../api/account/history/category";
import {updateAccountHistoryApi} from "../../../../api/account/history/history";
import {useRouter} from "next/router";
import {DateObjectType} from "../../../../interface/type/common";
import {dateToObject, toDateParser} from "../../../../utils/utils";
import {AccountHistoryItemType} from "../../../../interface/type/account/history/history";

const AccountHistoryUpdateModal: FunctionComponent<{
    reloadAccountInfo: Function,
}> = (
    {
        reloadAccountInfo,
    }
) => {
    const accountIdx: number = Number(useRouter().query.accountIdx);
    const dateObj: DateObjectType = dateToObject();

    const [
        showAccountHistoryUpdateModal,
        setShowAccountHistoryUpdateModal
    ] = useRecoilState(showAccountHistoryUpdateModalAtom);

    const selectedAccountHistoryInfo: AccountHistoryItemType = useRecoilValue(selectedAccountHistoryInfoAtom);

    const [type, setType] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<number>(0);
    const [categoryList, setCategoryList] = useState<AccountHistoryCategoryItemType[]>([]);
    const [createdAt, setCreatedAt] = useState<string>(`${dateObj.year}-${dateObj.month}-${dateObj.date}T${dateObj.hour}:${dateObj.minute}`);

    const getCategoryList = async () => {
        const response = await selectAccountHistoryCategoryApi({type});

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setCategoryList(response.data);
        setCategory(category ? category : response.data[0].idx);
    };

    const accountHistoryUpdate = async () => {
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
            setShowAccountHistoryUpdateModal(false);
        }
    };

    useEffect(() => {
        getCategoryList();
    }, [type]);

    useEffect(() => {
        setType(selectedAccountHistoryInfo?.type || 0);
        setAmount(selectedAccountHistoryInfo?.amount || 0);
        setContent(selectedAccountHistoryInfo?.content || '');
        setCategory(selectedAccountHistoryInfo?.accountHistoryCategory.idx);
        setCreatedAt(toDateParser(selectedAccountHistoryInfo?.createdAt));

    }, [selectedAccountHistoryInfo]);

    return (
        <div css={modalBackground(showAccountHistoryUpdateModal)}
             onClick={(e) => {
                 const element: HTMLDivElement = e.target as HTMLDivElement;

                 if (element.id === 'accountInsertModal') {
                     setShowAccountHistoryUpdateModal(false);
                 }
             }}>
            <div
                css={styles.accountHistoryInsertWrap(showAccountHistoryUpdateModal)}
                id={"accountInsertModal"}
            >
                <div css={styles.accountHistoryInsertBody(showAccountHistoryUpdateModal)}>
                    <div>
                        <input
                            placeholder={"금액"}
                            type={"number"}
                            value={amount}
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
                            value={category || 0}
                            onChange={(e) => {
                                setCategory(Number(e.target.value))
                            }}
                        >
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
                            defaultValue={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <div css={styles.dateWrap}>
                        <input
                            type={"datetime-local"}
                            defaultValue={createdAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
                        />
                    </div>

                    <div
                        css={styles.buttonWrap}
                    >
                        <button
                            onClick={accountHistoryUpdate}
                        >
                            수정하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountHistoryUpdateModal;
