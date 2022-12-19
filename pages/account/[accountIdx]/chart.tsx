import type {NextPage} from 'next';
import * as styles from '../../../styles/account/history/AccountHistoryChart.style';
import SetHead from "../../../src/component/common/Head";
import AccountHistoryDataModal from "../../../src/component/account/history/modal/AccountHistoryDataModal";
import {useRouter} from "next/router";
import AccountChooseModal from "../../../src/component/account/modal/AccountChooseModal";
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {showAccountChooseModalAtom} from "../../../src/recoil/atoms/account/account";
import {useEffect, useState} from "react";
import {freezeBackground} from "../../../src/utils/utils";
import {
    selectedAccountHistoryInfoAtom,
    showAccountHistoryDataModalAtom
} from "../../../src/recoil/atoms/account/history";
import {multipleAccountIdxAtom} from "../../../src/recoil/atoms/calendar/calendar";
import AccountHistoryPieChart from "../../../src/component/account/history/chart/pie";

const AccountHistoryChart: NextPage = () => {
    const labelList = [
        'js',
        'java',
        'ts',
        'python',
        'kotlin'
    ]

    const router = useRouter();
    const accountIdx = router.query.accountIdx;
    const showAccountChooseModal = useRecoilValue(showAccountChooseModalAtom);
    const resetSelectedAccountHistoryInfo = useResetRecoilState(selectedAccountHistoryInfoAtom);

    const [chartData, setChartData] = useState<any>([]);

    const [
        showAccountHistoryInsertModal,
        setShowAccountHistoryInsertModal
    ] = useRecoilState(showAccountHistoryDataModalAtom);

    const [
        multipleAccountIdx,
        setMultipleAccountIdx
    ] = useRecoilState(multipleAccountIdxAtom);

    useEffect(() => {
        const dataList = [];

        for(const label of labelList){
            dataList.push({
                id: label,
                label: label,
                value: (Math.random()*50).toFixed(1),
                color: "#fff111"
            });
        }

        dataList.push({
            id: "test",
            label: "test",
            value: 1,
            color: "#fff111"
        })

        setChartData(dataList);

    }, []);

    useEffect(() => {
        if(!multipleAccountIdx) {
            setMultipleAccountIdx(accountIdx === 'undefined' ? '-1' : accountIdx as string);
        }
    }, [
        accountIdx,
        multipleAccountIdx
    ]);

    useEffect(() => {
        freezeBackground(showAccountHistoryInsertModal, window, document);

        if (!showAccountHistoryInsertModal) {
            resetSelectedAccountHistoryInfo();
        }

    }, [showAccountHistoryInsertModal]);

    useEffect(() => {
        freezeBackground(showAccountChooseModal, window, document);

    }, [showAccountChooseModal]);

    return (
        <div
            css={styles.container}
        >
            <SetHead/>
            <AccountHistoryDataModal isCalendar={true}/>
            <AccountChooseModal/>

            <div css={styles.chartWrap}>
                <AccountHistoryPieChart
                    data={chartData}
                />
            </div>


        </div>
    )
}

export default AccountHistoryChart
