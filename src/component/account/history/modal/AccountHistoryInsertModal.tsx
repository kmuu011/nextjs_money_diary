import {FunctionComponent, useEffect, useState} from "react";
import {useRecoilState} from "recoil";

import {showAccountHistoryInsertModalAtom} from "../../../../recoil/atoms/account/history";
import {modalBackground} from "../../../../../styles/common/Common.style";
import * as styles from "../../../../../styles/account/history/insertModal.style";
import {AccountHistoryCategoryItemType} from "../../../../interface/type/account/history/category";
import {selectAccountHistoryCategoryApi} from "../../../../api/account/history/category";
import {createAccountHistoryApi} from "../../../../api/account/history/history";
import {useRouter} from "next/router";

const AccountHistoryInsertModal: FunctionComponent = () => {
    const accountIdx: number = Number(useRouter().query.accountIdx);

    const [
        showAccountHistoryInsertModal,
        setShowAccountHistoryInsertModal
    ] = useRecoilState(showAccountHistoryInsertModalAtom);

    const [type, setType] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<number>(0);
    const [categoryList, setCategoryList] = useState<AccountHistoryCategoryItemType[]>([]);

    const getCategoryList = async () => {
        const response = await selectAccountHistoryCategoryApi({type});

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setCategoryList(response.data);
        setCategory(response.data[0].idx);
    };

    const insertAccountHistory = async () => {
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

        const response = await createAccountHistoryApi(
            accountIdx,
            {
                amount,
                content,
                type,
                accountHistoryCategoryIdx: category
            }
        );

        console.log(response)

    }

    useEffect(() => {
        getCategoryList()
    }, [type]);

    return (
        <div className={modalBackground(showAccountHistoryInsertModal)}
             onClick={(e) => {
                 const element: HTMLDivElement = e.target as HTMLDivElement;

                 if (element.id === 'accountInsertModal') {
                     setShowAccountHistoryInsertModal(false);
                 }
             }}>
            <div
                className={styles.accountHistoryInsertWrap(showAccountHistoryInsertModal)}
                id={"accountInsertModal"}
            >
                <div className={styles.accountHistoryInsertBody(showAccountHistoryInsertModal)}>
                    <div>
                        <input
                            placeholder={"금액"}
                            type={"number"}
                            onChange={(e) => setAmount(parseInt(e.target.value))}
                        />
                    </div>
                    <div className={styles.contentInput}>
                        <input
                            placeholder={"내용"}
                            type={"text"}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <div className={styles.typeWrap}>
                        <div
                            className={styles.incomeType(type === 0)}
                            onClick={() => setType(0)}
                        >
                            지출
                        </div>
                        <div
                            className={styles.outcomeType(type === 1)}
                            onClick={() => setType(1)}
                        >
                            수입
                        </div>
                    </div>
                    <div className={styles.categoryWrap}>
                        <select
                            value={category}
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

                    <div
                        className={styles.buttonWrap}
                    >
                        <button
                            onClick={insertAccountHistory}
                        >
                            등록하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountHistoryInsertModal;