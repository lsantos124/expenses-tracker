import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import RemoveModal from './RemoveModal';
import { startRemoveExpense, startEditExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
	state = {
		delete: false
	}

	onSubmit = (expense) => {
		this.props.startEditExpense(this.props.expense.id, expense);
		this.props.history.push('/');
	}

	onClick = () => {
		this.setState(() => ({ delete: true }));	
	}

	handleDeleteExpense = () => {
		this.setState(() => ({ delete: false }));
		this.props.startRemoveExpense({ id: this.props.expense.id });
		this.props.history.push('/');	
	};

	handleCancelDeleteExpense = () => {
		this.setState(() => ({ delete: false }));	
	};

	render() {
		return (
			<div>
				<div className="page-header">
					<div className="content-container">
						<h1 className="page-header__title">Edit Expense</h1>
					</div>
				</div>
				<div className="content-container">
					<ExpenseForm 
						expense={this.props.expense}
						onSubmit={this.onSubmit}
					/>
					<button className="button button--secondary" onClick={this.onClick}>
						Remove Expense
					</button>
				</div>
				<RemoveModal 
					delete={this.state.delete}
					handleDeleteExpense={this.handleDeleteExpense}
					handleCancelDeleteExpense={this.handleCancelDeleteExpense}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		expense: state.expenses.find((expense) => expense.id === props.match.params.id)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
		startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);