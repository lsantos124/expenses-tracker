import React from 'react';
import { shallow } from 'enzyme';
import ExpensesBarChart from '../../components/ExpensesBarChart';

test('should render ExpensesBarChart with no expenses', () => {
	const wrapper = shallow(<ExpensesBarChart data={[]}/>);
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesBarChart with expenses', () => {
	const data = [
		{'y': 25, 'x':'12-31'},
		{'y': '', 'x':'01-01'},
		{'y': '', 'x':'01-02'},
		{'y': '', 'x':'01-03'},
		{'y': 16, 'x':'01-04'}
	];

	const wrapper = shallow(<ExpensesBarChart data={data}/>);
	expect(wrapper).toMatchSnapshot();
});