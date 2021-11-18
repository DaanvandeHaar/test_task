import {useEffect, useState} from 'react';
import React from "react";
import {getCompaniesBySymbol, getCompaniesStockBySymbol, getCompanyStockBySymbol} from "../../api/services/Company";

import Chart, {
    Series,
    Aggregation,
    ArgumentAxis,
    Grid,
    Label,
    ValueAxis,
    Margin,
    Legend,
    Tooltip,
} from 'devextreme-react/chart';

import RangeSelector, {
    Size,
    Scale,
    Chart as RsChart,
    ValueAxis as RsValueAxis,
    Series as RsSeries,
    Aggregation as RsAggregation,
    Behavior,
} from 'devextreme-react/range-selector';

export default function StockChart() {

    const [companyData, setCompanyData] = React.useState([]);
    const [symbol, setSymbol] = React.useState(['IBM']);
    const [visualRange, updateVisualRange] = useState({});

    useEffect( () => {
        getCompanyStockBySymbol(symbol)
            .then(result => {
                setCompanyData(result);
                console.log(companyData)
            })
    }, []);


    return (
        <div id="chart-demo">
            <Chart
                id="zoomedChart"
                dataSource={companyData}
                title="Google Inc. Stock Prices"
            >
                <Series
                    type="candleStick"
                    openValueField="open"
                    highValueField="high"
                    lowValueField="low"
                    closeValueField="close"
                    argumentField="date"
                >
                    <Aggregation enabled={true} />
                </Series>
                <ArgumentAxis
                    visualRange={visualRange}
                    valueMarginsEnabled={false}
                    argumentType="datetime"
                >
                    <Grid visible={true} />
                    <Label visible={false} />
                </ArgumentAxis>
                <ValueAxis valueType="numeric" />
                <Margin right={10} />
                <Legend visible={false} />
                <Tooltip enabled={true} />
            </Chart>
            <RangeSelector
                dataSource={companyData}
                onValueChanged={updateVisualRange}
            >
                <Size height={120} />
                <RsChart>
                    <RsValueAxis valueType="numeric" />
                    <RsSeries
                        type="line"
                        valueField="Open"
                        argumentField="Date"
                    >
                        <RsAggregation enabled="true" />
                    </RsSeries>
                </RsChart>
                <Scale
                    placeholderHeight={20}
                    minorTickInterval="day"
                    tickInterval="month"
                    valueType="datetime"
                    aggregationInterval="week"
                />
                <Behavior
                    snapToTicks={false}
                    callValueChanged="onMoving"
                />
            </RangeSelector>
        </div>
    );
}



