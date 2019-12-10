import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';
import { filters } from '../fixtures/filters';

test('should render ExpenseList with expenses', () => {
	const wrapper = shallow(<ExpenseList filters={filters} expenses={expenses}/>);
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseList with empty message', () => {
	const wrapper = shallow(<ExpenseList filters={filters} expenses={[]}/>);
	expect(wrapper).toMatchSnapshot();
});