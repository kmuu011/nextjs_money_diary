import type {NextPage} from 'next';
import SetHead from "../../src/component/common/Head";
import * as styles from "../../styles/setting/Setting.style";
import Link from "next/link";

const optionList = [
    {
        title: "가계부 옵션",
        subOptionList: [
            {
                title: "카테고리 설정",
                url: "/setting/account/history/category"
            }
        ]
    },
]
const Setting: NextPage = () => {

    return (
        <div css={styles.container}>
            <SetHead/>

            <div css={styles.settingListWrap}>
                {
                    optionList.map(option =>
                        <div css={styles.settingWrap}>
                            <div css={styles.optionTitle}>
                                {option.title}
                            </div>
                            {
                                option.subOptionList.map(subOption =>
                                    <Link href={subOption.url}>
                                        <div css={styles.subOptionWrap}>
                                            <div css={styles.subOptionTitle}>
                                                {subOption.title}
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Setting
