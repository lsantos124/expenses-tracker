import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { SingleDatePicker } from 'react-dates';

export class ExpenseForm extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			description: props.expense ? props.expense.description : '',
			note: props.expense ? props.expense.note : '',
			amount: props.expense ? (props.expense.amount / 100).toString() : '',
			createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
			category: props.expense ? props.expense.category : '',
			calendarFocused: false,
			error: ''
		};
	}

	onDescriptionChange = (e) => {
		const description = e.target.value;
		this.setState(() => ({ description }));
	};

	onNoteChange = (e) => {
		const note = e.target.value;
		this.setState(() => ({ note }));
	}

	onAmountChange = (e) => {
		const amount = e.target.value;
		if (!amount || amount.match(/^\d+(\.\d{0,2})?$/)) {
			this.setState(() => ({ amount }));
		}
	}

	onDateChange = (createdAt) => {
		if (createdAt) {
			this.setState(() => ({ createdAt }));			
		}
	};

	onFocusChange = ({ focused }) => {
		this.setState(() => ({ calendarFocused: focused }));
	};

	onSelectChange = (e) => {
		const category = e.target.value;
		this.setState(() => ({ category }));			
	};

	onSubmit = (e) => {
		e.preventDefault();

		if (!this.state.description || !this.state.amount) {
			this.setState(() => ({ error: 'Please provide description and amount.' }));
		} else {
			this.setState(() => ({ error: '' }));
			this.props.onSubmit({
				description: this.state.description,
				amount: parseFloat(this.state.amount, 10) * 100,
				createdAt: this.state.createdAt.valueOf(),
				note: this.state.note,
				category: this.state.category
			});
		}
	};

	render() {
		return (
			<form className="form" onSubmit={this.onSubmit}>
				{ this.state.error && <p className="form__error">{this.state.error}</p>}
				<input
					type="text"
					placeholder="Description"
					autoFocus
					className="text-input"
					value={this.state.description}
					onChange={this.onDescriptionChange}
				/>
				<input
					type="text"
					className="text-input"
					placeholder="Amount"
					value={this.state.amount}
					onChange={this.onAmountChange}
				/>
				<SingleDatePicker
					date={this.state.createdAt}
					onDateChange={this.onDateChange}
					focused={this.state.calendarFocused}
					onFocusChange={this.onFocusChange}
					numberOfMonths={1}
					isOutsideRange={() => false}
				/>
				<div>
					<label className="select__label">Category:</label>
					<select 
						className="select"
						defaultValue={this.state.category}
						onChange={this.onSelectChange}
					>
						<option value="">None</option>
						{
							this.props.categories.map(({id, title, color}) => {
								return (
									<option
										key={id} 
										value={title}
									>
										{title}
									</option>
								);
							})
						}
					</select>
				</div>
				<textarea
					className="textarea"
					placeholder="Add a note for your expense (optional)"
					value={this.state.note}
					onChange={this.onNoteChange}
				>
				</textarea>
				<div>
					<button className="button">Save Expense</button>
				</div>
			</form>
		);
	}
}

const mapStateToProps = (state) => ({
	categories: state.categories
});

export default connect(mapStateToProps)(ExpenseForm);