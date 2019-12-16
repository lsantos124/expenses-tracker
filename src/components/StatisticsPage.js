import React from 'react';
import { connect } from 'react-redux';
import {
    RadialChart
} from 'react-vis';
import numeral from 'numeral';
import getExpensesPerCategory from '../selectors/expenses-per-category';

export const StatisticsPage = (props) => {
    const data = getExpensesPerCategory(props.expenses, props.categories);
    return (
        <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Statistics</h1>
                </div>
            </div>
            <div className="content-container">
                <div className="graph-display">
                    <h3 className="graph-title">Category Breakdown</h3>
                </div>
                <div className="graph-display">
                    <RadialChart
                        colorType={'literal'}
                        colorDomain={[0, 100]}
                        colorRange={[0, 10]}
                        // getLabel={d => d.name}
                        data={data}
                        // labelsRadiusMultiplier={1.1}
                        // labelsStyle={{fontSize: 12, fill: '#222'}}
                        // showLabels
                        style={{stroke: '#fff', strokeWidth: 2}}
                        width={300}
                        height={300}
                    />
                </div>
                {
                    data.map((categoryData, index) => {
                        return (
                            <div key={index} className="graph-legend">
                                <div className="list-item__color">
                                    <div className="box-color" style={{backgroundColor: categoryData.color}}></div>
                                    <span>{categoryData.name}</span>
                                </div>
                                <span className="graph-legend__item">{numeral(categoryData.angle).format('$0,0.00')}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    expenses: state.expenses,
    categories: state.categories
});

export default connect(mapStateToProps)(StatisticsPage);