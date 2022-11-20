import type {NextPage} from 'next';
import SetHead from "../../src/component/common/Head";
import * as styles from "../../styles/setting/Setting.style";
import Link from "next/link";

const optionList = [
    {
        title: "가계부 설정",
        subOptionList: [
            {
                title: "카테고리 설정",
                url: "/setting/account/history/category"
            }
        ]
    },
];

const Setting: NextPage = () => {

    return (
        <div css={styles.container}>
            <SetHead/>

            <div css={styles.settingListWrap}>
                {
                    optionList.map((option, optionIndex) =>
                        <div css={styles.settingWrap} key={optionIndex}>
                            <div css={styles.optionTitle}>
                                {option.title}
                            </div>
                            {
                                option.subOptionList.map((subOption, subOptionIndex) =>
                                    <Link href={subOption.url} key={subOptionIndex}>
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
