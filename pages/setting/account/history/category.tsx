import type {NextPage} from 'next';
import * as styles from "../../../../styles/setting/account/history/AccountHistoryCategorySetting.style";
import SetHead from "../../../../src/component/common/Head";
import AccountHistoryCategorySelect from "../../../../src/component/account/history/AccountHistoryCategorySelect";
import {useRecoilValue} from "recoil";
import {accountHistoryTypeAtom} from "../../../../src/recoil/atoms/account/history";

const AccountHistoryCategorySetting: NextPage = () => {
    const type = useRecoilValue(accountHistoryTypeAtom);

    return (
        <div css={styles.container}>
            <SetHead/>

            <div css={styles.categorySettingWrap}>
                <div>
                    test
                </div>
                <div>
                    <AccountHistoryCategorySelect/>

                </div>
            </div>
        </div>
    )
}

export default AccountHistoryCategorySetting
