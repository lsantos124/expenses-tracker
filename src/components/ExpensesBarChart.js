// MyBarChart.js
import React from 'react';
import {
    FlexibleWidthXYPlot,
    XAxis, // Shows the values on x axis
    YAxis, // Shows the values on y axis
    VerticalBarSeries,
    LabelSeries,
    HorizontalGridLines
} from 'react-vis';

class ExpensesBarChart extends React.Component {
    render() {
    	let maxData = 0;

		this.props.data.map((data) => {
			maxData = Math.max(maxData, data['y']);
			return data;
		});
        
        const data = this.props.data;
        const chartHeight = 250;
        const chartDomain = [0, maxData + 20];
        return (
            <FlexibleWidthXYPlot 
                xType="ordinal" 
                height={chartHeight}
                yDomain={chartDomain}
            >
                <XAxis 
                	title="Date"
                	tickLabelAngle={45} 
                	tickPadding={35}
            	    tickValues={(
            	    	data.length > 15)
			              ? data
			                .filter((item, idx) => {
			                  if ((idx % Math.floor(data.length / 15)) === 0) {
			                    return item.x
			                  }
			                }).map(item => (item.x))
			              : data.map(item => (item.x))
			          }
			    />
                <YAxis title="Amount ($)"/>
                <VerticalBarSeries
                    data={data}
                />
                <LabelSeries
                    data={data.map(obj => {
                        return { ...obj, label: obj.y.toString() }
                    })}
                    labelAnchorX="start"
                    labelAnchorY="text-after-edge"
                    rotation={-45}
                />
                <HorizontalGridLines />
            </FlexibleWidthXYPlot>
        );
    }
}
export default ExpensesBarChart;