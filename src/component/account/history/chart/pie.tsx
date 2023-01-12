import {FunctionComponent} from "react";

import {ResponsivePie} from "@nivo/pie";
import {
    AccountCategorySummaryChartType
} from "../../../../interface/type/account/account";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {
    accountHistoryCategoryCostAtom,
    accountHistoryLastAtom,
    accountHistoryStartCursorAtom,
    multipleAccountHistoryCategoryIdxAtom
} from "../../../../recoil/atoms/account/history";

const AccountHistoryPieChart: FunctionComponent<{ data: AccountCategorySummaryChartType[] }> = (
    {
        data
    }
) => {

    const setMultipleAccountHistoryCategoryIdx = useSetRecoilState(multipleAccountHistoryCategoryIdxAtom);
    const resetAccountHistoryLast = useResetRecoilState(accountHistoryLastAtom);
    const resetAccountHistoryStartCursor = useResetRecoilState(accountHistoryStartCursorAtom);
    const setAccountHistoryCategoryCost = useSetRecoilState(accountHistoryCategoryCostAtom);

    return (
        <ResponsivePie
            data={data}
            valueFormat={value => value + '%'}
            margin={{top: 40, right: 80, bottom: 80, left: 80}}
            innerRadius={0.6}
            padAngle={0.7}
            onClick={(e) => {
                setMultipleAccountHistoryCategoryIdx(e.data.categoryIdx.toString());
                resetAccountHistoryLast();
                resetAccountHistoryStartCursor();
                setAccountHistoryCategoryCost(e.data.amount || 0);
            }}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{from: 'color'}}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            colors={data.map(v => v.color)}
            // legends={[
            //     {
            //         anchor: 'bottom',
            //         direction: 'row',
            //         justify: false,
            //         translateX: 0,
            //         translateY: 56,
            //         itemsSpacing: 0,
            //         itemWidth: 100,
            //         itemHeight: 18,
            //         itemTextColor: '#999',
            //         itemDirection: 'left-to-right',
            //         itemOpacity: 1,
            //         symbolSize: 18,
            //         symbolShape: 'circle',
            //         effects: [
            //             {
            //                 on: 'hover',
            //                 style: {
            //                     itemTextColor: '#000'
            //                 }
            //             }
            //         ]
            //     }
            // ]}
        />
    )
}

export default AccountHistoryPieChart
