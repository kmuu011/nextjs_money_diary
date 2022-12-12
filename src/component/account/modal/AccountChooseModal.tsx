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
            if(multipleAccountIdx) {
                v.checked = multipleAccountIdx === '-1' ? true : (multipleAccountIdx.split(',').indexOf(v.idx+'') !== -1)
            }
            return v;
        }));
    }

    const checkAll = () => {
        setAccountList([...accountList.map(v => {
            v.checked = true;
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
                 }
             }}
        >
            <div
                css={styles.accountChooseWrap}
                id={"accountChooseModal"}
            >
                <div css={styles.accountChooseBody(showAccountChooseModal)}>
                    <button onClick={checkAll}>dd</button>

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
                                                accountList[accountList.findIndex(a => a.idx === v.idx )].checked = e.target.checked;
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
                        setMultipleAccountIdx(accountList
                            .filter(v => v.checked)
                            .map(v => v.idx).join(','))
                    }}>적용</button>
                </div>
            </div>


        </div>
    )
}

export default AccountChooseModal
