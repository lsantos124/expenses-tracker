import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should correctly render ExpensesSummary with 1 expense', () => {
	const filters = {
		text: 'e',
		sortBy: 'date',
		startDate: undefined,
		endDate: undefined
	}; 
	const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={235}/>);
	expect(wrapper).toMatchSnapshot();
});

test('should correctly render ExpensesSummary with multiple expenses', () => {
	const filters = {
		text: 'e',
		sortBy: 'date',
		startDate: undefined,
		endDate: undefined
	}; 
	const wrapper = shallow(<ExpensesSummary eexpensesCount={23} expensesTotal={2352342}/>);
	expect(wrapper).toMatchSnapshot();
});