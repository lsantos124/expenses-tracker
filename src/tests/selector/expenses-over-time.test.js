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

test('should create data object for expenses to display in graph', () => {
	const filters = {
		text: '',
		sortBy: 'amount',
		startDate: moment(0),
		endDate: moment(0).add(5, 'days')
	};

	const graphData = getExpensesOverTime(expenses, filters);
	expect(graphData).toEqual([
		{'y': 25, 'x':'12-31'},
		{'y': '', 'x':'01-01'},
		{'y': '', 'x':'01-02'},
		{'y': '', 'x':'01-03'},
		{'y': 16, 'x':'01-04'}
	]);
});

test('should create data object with no expenses to display in graph', () => {
	const filters = {
		text: '',
		sortBy: 'amount',
		startDate: moment(0).add(5, 'days'),
		endDate: moment(0).add(6, 'days')
	};

	const graphData = getExpensesOverTime(expenses, filters);
	expect(graphData).toEqual([
		{'y': '', 'x':'01-05'}
	]);
});