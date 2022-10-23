import {FunctionComponent} from "react";
import {useRecoilState} from "recoil";

import {showAccountHistoryInsertModalAtom} from "../../../../recoil/atoms/accountHistory";
import {modalBackground} from "../../../../../styles/common/Common.style";
import * as styles from "../../../../../styles/account/history/insertModal.style";

const AccountHistoryInsertModal: FunctionComponent = () => {
    const [
        showAccountHistoryInsertModal,
        setShowAccountHistoryInsertModal
    ] = useRecoilState(showAccountHistoryInsertModalAtom);

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
                        <input type={"text"}/>
                    </div>
                    <div>
                        <input type={"text"}/>
                    </div>
                    <div>
                        <div>지출</div>
                        <div>수입</div>
                    </div>
                    <div>
                        <select>
                            <option>테스트</option>
                        </select>
                    </div>

                    <div>
                        등록하기
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountHistoryInsertModal;
