import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVisibleExpenses, getHiddenExpenses } from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import getExpensesOverTime from '../selectors/expenses-over-time';
import numeral from 'numeral';
import ExpensesBarChart from './ExpensesBarChart';

export const ExpensesSummary = ({ expenseCount, expensesTotal, hiddenExpenseCount, expensesOverTime }) => {
	const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
	const hiddenExpenseWord = hiddenExpenseCount === 1 ? 'expense' : 'expenses';
	const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');

	return (
		<div className="page-header">
			<div className="content-container">
				<h1 className="page-header__title">Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{formattedExpensesTotal}</span></h1>
				<h3 className="page-header__subtitle"><span>{hiddenExpenseCount}</span> {hiddenExpenseWord} hidden</h3>
				<div className="page-header__actions">
					<Link className="button" to="/create">Add Expense</Link>
				</div>
				<div className="graph">
					<ExpensesBarChart data={expensesOverTime}/>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	const hiddenExpenses = getHiddenExpenses(state.expenses, state.filters);

	return {
		expenseCount: visibleExpenses.length,
		expensesTotal: getExpensesTotal(visibleExpenses),
		hiddenExpenseCount: hiddenExpenses.length,
		expensesOverTime: getExpensesOverTime(visibleExpenses, state.filters)
	};
};

export default connect(mapStateToProps)(ExpensesSummary);