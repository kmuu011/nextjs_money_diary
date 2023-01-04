import type {NextPage} from 'next';
import * as styles from '../../../styles/account/history/AccountHistoryChart.style';
import SetHead from "../../../src/component/common/Head";
import AccountHistoryDataModal from "../../../src/component/account/history/modal/AccountHistoryDataModal";
import {useRouter} from "next/router";
import AccountChooseModal from "../../../src/component/account/modal/AccountChooseModal";
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {showAccountChooseModalAtom} from "../../../src/recoil/atoms/account/account";
import {useEffect, useState} from "react";
import {commaParser, dateToObject, freezeBackground} from "../../../src/utils/utils";
import {
    accountHistoryTypeAtom, monthForSelectAccountHistoryAtom,
    selectedAccountHistoryInfoAtom,
    showAccountHistoryDataModalAtom, yearForSelectAccountHistoryAtom
} from "../../../src/recoil/atoms/account/history";
import {multipleAccountIdxAtom} from "../../../src/recoil/atoms/calendar/calendar";
import AccountHistoryPieChart from "../../../src/component/account/history/chart/pie";
import {selectCategoryCostSummaryApi} from "../../../src/api/account/account";
import {SelectAccountCategoryCostSummaryDto} from "../../../src/interface/dto/account/account";
import {
    AccountCategoryCostSummaryType,
    AccountCategorySummaryChartType
} from "../../../src/interface/type/account/account";
import AccountHistoryType from "../../../src/component/account/history/AccountHistoryType";

const nowDateObj = dateToObject();

const yearLength = Number(nowDateObj.year) - 2018;
const yearList = [...Array(yearLength)].map((v, i) => Number(nowDateObj.year) - i);
const monthList = [...Array(12)].map((v, i) => i + 1);

const AccountHistoryChart: NextPage = () => {
    const router = useRouter();
    const accountIdx = router.query.accountIdx;
    const showAccountChooseModal = useRecoilValue(showAccountChooseModalAtom);
    const resetSelectedAccountHistoryInfo = useResetRecoilState(selectedAccountHistoryInfoAtom);

    const [type, setType] = useRecoilState(accountHistoryTypeAtom);

    const [year, setYear] = useRecoilState(yearForSelectAccountHistoryAtom);
    const [month, setMonth] = useRecoilState(monthForSelectAccountHistoryAtom);

    const [chartData, setChartData] = useState<AccountCategorySummaryChartType[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const [
        showAccountHistoryInsertModal,
        setShowAccountHistoryInsertModal
    ] = useRecoilState(showAccountHistoryDataModalAtom);

    const [
        multipleAccountIdx,
        setMultipleAccountIdx
    ] = useRecoilState(multipleAccountIdxAtom);

    const getCategorySummary = async () => {
        if (type === undefined || year === undefined) return;
        const dataList: AccountCategorySummaryChartType[] = [];

        const payload: SelectAccountCategoryCostSummaryDto = {
            type,
            year,
        }

        if (Number(month) !== 0) payload.month = month;

        const response = await selectCategoryCostSummaryApi(payload);

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        const totalAmount: number =
            response.data.reduce((acc: number, v: AccountCategoryCostSummaryType) => acc += v.amount, 0);

        for (const d of response.data as AccountCategoryCostSummaryType[]) {
            d.percent = (d.amount / totalAmount * 100).toFixed(1);

            dataList.push({
                id: d.categoryName,
                label: d.categoryName,
                value: d.percent,
                color: d.color
            });

        }

        setTotalAmount(totalAmount);
        setChartData(dataList);
    }

    useEffect(() => {
        getCategorySummary();


    }, [type, year, month]);

    useEffect(() => {
        if (!multipleAccountIdx) {
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

    useEffect(() => {
        setYear(nowDateObj.year);
        setMonth(nowDateObj.month);
        setType(0);

    }, []);

    return (
        <div
            css={styles.container}
        >
            <SetHead/>
            <AccountHistoryDataModal isCalendar={true}/>
            <AccountChooseModal/>

            <div css={styles.topButtonWrap}>
                <div css={styles.dateWrap}>
                    <div>
                        <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        >
                            {
                                yearList.map(v => {
                                    return <option
                                        value={v}
                                        key={v}
                                    >{v}</option>
                                })
                            }
                        </select>
                        년
                    </div>
                    <div>
                        <select
                            value={Number(month) || 0}
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            <option
                                value={0}
                                key={0}
                            >전체
                            </option>
                            {
                                monthList.map(v => {
                                    return <option
                                        value={v}
                                        key={v}
                                    >{v}</option>
                                })
                            }
                        </select>
                        월
                    </div>
                </div>
                <div css={styles.typeWrap}>
                    <AccountHistoryType/>
                </div>
            </div>

            <div css={styles.chartWrap}>
                <div css={styles.totalAmount}>
                    {totalAmount ? commaParser(totalAmount) + '원' : ''}
                </div>
                {
                    chartData.length !== 0 ?
                        <AccountHistoryPieChart
                            data={chartData}
                        />
                        :
                        <div>정보 없음</div>
                }
            </div>


        </div>
    )
}

export default AccountHistoryChart
