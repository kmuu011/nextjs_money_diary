import type {NextPage} from 'next';
import * as styles from '../../../styles/account/Account.style';
import {useEffect, useState} from "react";
import SetHead from "../../../src/component/common/Head";
import CalendarFrame from "../../../src/component/calendar/calendar";

const AccountHistoryCalendar: NextPage = () => {

    return (
        <div
            css={styles.container}
        >
            <SetHead/>
            <div>
                <CalendarFrame/>
            </div>

        </div>
    )
}

export default AccountHistoryCalendar
