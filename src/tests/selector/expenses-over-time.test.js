import getExpensesOverTime from '../../selectors/expenses-over-time';
import moment from 'moment';

const expenses = [{
	id: '1',
	description: 'Gum',
	note: '',
	amount: 1200,
	createdAt: 0
}, {
	id: '2',
	description: 'Rent',
	note: '',
	amount: 1300,
	createdAt: 0
}, {
	id: '3',
	description: 'Credit Card',
	note: '',
	amount: 1600,
	createdAt: moment(0).add(4, 'days').valueOf()
}];

const filters = {
	text: '',
	sortBy: 'amount',
	startDate: moment(0),
	endDate: moment(0).add(3, 'days')
};

test('should output expenses over time', () => {
	getExpensesOverTime(expenses, filters);
});