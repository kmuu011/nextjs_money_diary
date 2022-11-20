import {FunctionComponent} from "react";
import * as styles from "../../../../styles/account/history/AccountHistoryDataModal.style";
import {useRecoilState, useResetRecoilState} from "recoil";
import {accountHistoryCategoryAtom, accountHistoryTypeAtom} from "../../../recoil/atoms/account/history";

const AccountHistoryType: FunctionComponent<{radius?: boolean}> = (
    {
        radius
    }
) => {
    const [type, setType] = useRecoilState(accountHistoryTypeAtom);
    const resetCategory = useResetRecoilState(accountHistoryCategoryAtom);

    radius = radius === undefined ? true : radius;

    return (
        <div css={styles.typeWrap(radius)}>
            <div
                css={styles.historyType(type === 0, radius)}
                onClick={() => {
                    setType(0);
                    resetCategory();
                }}
            >
                지출
            </div>
            <div
                css={styles.historyType(type === 1, radius)}
                onClick={() => {
                    setType(1);
                    resetCategory();
                }}
            >
                수입
            </div>
        </div>
    )
}

export default AccountHistoryType;
