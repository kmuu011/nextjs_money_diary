import {FunctionComponent, useEffect, useState} from "react";
import * as styles from "../../../../../styles/account/history/AccountHistoryChart.style";

import {ResponsivePie} from "@nivo/pie";
import {
    AccountCategorySummaryChartType
} from "../../../../interface/type/account/account";
import {log} from "util";

const AccountHistoryPieChart: FunctionComponent<{ data: AccountCategorySummaryChartType[] }> = (
    {
        data
    }
) => {

    return (
        <ResponsivePie
            data={data}
            valueFormat={value => value + '%'}
            margin={{top: 40, right: 80, bottom: 80, left: 80}}
            innerRadius={0.6}
            padAngle={0.7}
            onClick={(e) => console.log(e)}
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
