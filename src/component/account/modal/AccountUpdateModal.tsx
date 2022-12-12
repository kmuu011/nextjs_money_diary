import {FunctionComponent, useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import * as styles from "../../../../styles/account/AccountUpdateModal.style";
import {modalBackground} from "../../../../styles/common/Common.style";
import {showAccountUpdateModalAtom} from "../../../recoil/atoms/account/account";
import {AccountItemType} from "../../../interface/type/account/account";


const AccountUpdateModal: FunctionComponent<{
    accountInfo: AccountItemType | undefined,
    accountUpdate: Function,
}> = (
    {
        accountInfo,
        accountUpdate,
    }
) => {
    const [accountName, setAccountName] = useState<string>('');
    const [invisibleAmount, setInvisibleAmount] = useState<boolean>(false);

    const [
        showAccountUpdateModal,
        setShowAccountUpdateModal
    ] = useRecoilState(showAccountUpdateModalAtom);

    useEffect(() => {
        if(showAccountUpdateModal){
            setAccountName(accountInfo?.accountName || '')
            setInvisibleAmount(accountInfo?.invisibleAmount === 1);
        }
    }, [showAccountUpdateModal]);

    return (
        <div css={modalBackground(showAccountUpdateModal)}
             onClick={(e) => {
                 const element: HTMLDivElement = e.target as HTMLDivElement;

                 if (element.id === 'accountUpdateModal') {
                     setShowAccountUpdateModal(false);
                 }
             }}>
            <div
                css={styles.accountUpdateWrap}
                id={"accountUpdateModal"}
            >
                <div css={styles.accountUpdateBody(showAccountUpdateModal)}>
                    <div>
                        <input
                            placeholder={"가계부 명칭"}
                            type={"text"}
                            defaultValue={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                        />
                    </div>
                    <div css={styles.invisibleAmountInputDiv}>
                        <input type={"checkbox"} id={"cb"} checked={invisibleAmount}
                               onChange={(e) => setInvisibleAmount(e.target.checked)}/>
                        <label htmlFor={"cb"}>
                            <div css={styles.invisibleAmountInputLabel}>
                                목록에서 금액 숨기기
                            </div>
                        </label>
                    </div>
                    <div css={styles.accountUpdateButton}>
                        <button
                            onClick={() => {
                                accountUpdate(accountName, (invisibleAmount ? 1 : 0));
                            }}
                        >
                            수정하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountUpdateModal;
