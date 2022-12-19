import {FunctionComponent, useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {selectAccountApi} from "../../../api/account/account";
import {AccountItemType} from "../../../interface/type/account/account";
import {showAccountChooseModalAtom} from "../../../recoil/atoms/account/account";
import {multipleAccountIdxAtom} from "../../../recoil/atoms/calendar/calendar";
import {modalBackground} from "../../../../styles/common/Common.style";
import * as styles from "../../../../styles/account/AccountChooseModal";

const AccountChooseModal: FunctionComponent = () => {
    const [accountList, setAccountList] = useState<AccountItemType[]>([]);

    const [
        multipleAccountIdx,
        setMultipleAccountIdx
    ] = useRecoilState(multipleAccountIdxAtom);

    const [
        showAccountChooseModal,
        setShowAccountChooseModal
    ] = useRecoilState(showAccountChooseModalAtom);

    const getAccountList = async (): Promise<void> => {
        const query = {
            startCursor: 0
        }

        const response = await selectAccountApi(query);

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setAccountList(response.data.items.map((v: AccountItemType) => {
            if (multipleAccountIdx) {
                v.checked = multipleAccountIdx === '-1' ? true : (multipleAccountIdx.split(',').indexOf(v.idx + '') !== -1)
            }
            return v;
        }));
    }

    const checkAll = (checked: boolean) => {
        setAccountList([...accountList.map(v => {
            v.checked = checked;
            return v;
        })]);
    }

    useEffect(() => {
        getAccountList()
    }, [multipleAccountIdx]);

    return (
        <div css={modalBackground(showAccountChooseModal)}
             onClick={(e) => {
                 const element: HTMLDivElement = e.target as HTMLDivElement;

                 if (element.id === 'accountChooseModal') {
                     setShowAccountChooseModal(false);
                     if (multipleAccountIdx) {
                         accountList.forEach(v => {
                             v.checked = multipleAccountIdx === '-1' ? true :
                                 multipleAccountIdx.split(',').indexOf(v.idx.toString()) !== -1
                         })
                     }
                 }
             }}
        >
            <div
                css={styles.accountChooseWrap}
                id={"accountChooseModal"}
            >
                <div css={styles.accountChooseBody(showAccountChooseModal)}>
                    <label
                        css={styles.accountChooseItem}
                    >
                        <div>
                            <input
                                type={"checkbox"}
                                checked={accountList.every(v => v.checked)}
                                onChange={(e) => checkAll(e.target.checked)}
                            />
                        </div>
                        <div>
                            전체선택
                        </div>
                    </label>

                    <div>
                        {
                            accountList.map((v) => {
                                return <label
                                    css={styles.accountChooseItem}
                                    key={v.idx}
                                >
                                    <div>
                                        <input
                                            type={"checkbox"}
                                            checked={v.checked === true}
                                            onChange={(e) => {
                                                accountList[accountList.findIndex(a => a.idx === v.idx)].checked = e.target.checked;
                                                setAccountList([...accountList])
                                            }}
                                        />
                                    </div>
                                    <div>
                                        {v.accountName}
                                    </div>
                                </label>
                            })
                        }
                    </div>

                    <button onClick={() => {
                        if(accountList.filter(v => v.checked).length === 0){
                            alert('하나 이상의 가계부를 선택해주세요.');
                            return;
                        }
                        setMultipleAccountIdx(accountList
                            .filter(v => v.checked)
                            .map(v => v.idx).join(','))
                        setShowAccountChooseModal(false);
                    }}>적용
                    </button>
                </div>
            </div>


        </div>
    )
}

export default AccountChooseModal
