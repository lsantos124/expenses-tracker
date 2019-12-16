import React from 'react';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import numeral from 'numeral';
import ExpenseListItem from './ExpenseListItem';
import { getVisibleExpenses } from '../selectors/expenses';

export const ExpenseList = (props) => {
	const csvHeaders = [['description', 'amount', 'createdAt']];
	const csvExpenseData = props.expenses.map(({ id, description, amount, createdAt }) => {
		const createdAtFormatted = moment(createdAt).format('MMMM Do, YYYY');
		const amountFormatted = numeral(amount / 100).format('$0,0.00');
		return [description, amountFormatted, createdAtFormatted];
	});
	const csvData = [ ...csvHeaders, ...csvExpenseData ];

	const startDateFormatted = moment(props.startDate).format('MMMM Do, YYYY');
	const endDateFormatted = moment(props.endDate).format('MMMM Do, YYYY');
	const fileName = `text=${props.filters.text}_startDate=${startDateFormatted}_endDate=${endDateFormatted}.csv`;
	
	return (
		<div className="content-container">
			<div className="list-header">
				<div className="show-for-mobile">Expenses</div>
				<div className="show-for-desktop">Expense</div>
				<div className="show-for-desktop">Amount</div>
			</div>
			<div className="list-body">
			{
				props.expenses.length === 0 ? (
					<div className="list-item list-item--message">
						<span>No expenses</span>
					</div>
				) : (
					props.expenses.map((expense) => {
						let categoryColor = '';
						props.categories.map((category) => {
							if (category.title == expense.category) {
								categoryColor = category.color;
							}
							return category
						})

						return <ExpenseListItem key={expense.id} {...expense} color={categoryColor} />;
					})
				)
			}
			</div>
			<div className="list-buttons">
				<CSVLink 
					className="button button--csvlink" 
					data={csvData}
					filename={fileName}
					>
						Download
					</CSVLink>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		expenses: getVisibleExpenses(state.expenses, state.filters),
		filters: state.filters,
		categories: state.categories
	};
}

export default connect(mapStateToProps)(ExpenseList);