import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseForm } from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import categories from '../fixtures/categories';

let wrapper;

beforeEach(() => {
	wrapper = shallow(<ExpenseForm categories={categories}/>);
});

test('should render ExpenseForm correctly', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm correctly with expense data', () => {
	wrapper = shallow(<ExpenseForm expense={expenses[0]} categories={categories}/>);
	expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {

	expect(wrapper).toMatchSnapshot();
	wrapper.find('form').simulate('submit', {
		preventDefault: () => { }
	});
	expect(wrapper.state('error').length).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
	const value = 'New description';
	wrapper.find('input').at(0).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('description')).toBe(value);
	expect(wrapper).toMatchSnapshot();
});

test('should set note on textarea change', () => {
	const value = 'New note';
	wrapper.find('textarea').simulate('change', {
		target: { value }
	});
	expect(wrapper.state('note')).toBe(value);
	expect(wrapper).toMatchSnapshot();
});

test('should set amount if valid input', () => {
	const value = '23.50';
	wrapper.find('input').at(1).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('amount')).toBe(value);
	expect(wrapper).toMatchSnapshot();
});

test('should not set amount if invalid input', () => {
	const value = '12.122';
	wrapper.find('input').at(1).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('amount')).toBe('');
	expect(wrapper).toMatchSnapshot();
});

test('should call onSubmit prop for valid form submission', () => {
	const onSubmitSpy = jest.fn();
	wrapper = shallow(<ExpenseForm expense={expenses[0]} categories={categories} onSubmit={onSubmitSpy}/>);	
	wrapper.find('form').simulate('submit', {
		preventDefault: () => { }
	});
	expect(wrapper.state('error')).toBe('');
	expect(onSubmitSpy).toHaveBeenLastCalledWith({
		description: expenses[0].description,
		amount: expenses[0].amount,
		note: expenses[0].note,
		createdAt: expenses[0].createdAt,
		category: expenses[0].category
	});
});

test('should set new date on date change', () => {
	const now = moment();
	wrapper.find('SingleDatePicker').prop('onDateChange')(now);
	expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
	const focused = true;
	wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
	expect(wrapper.state('calendarFocused')).toBe(focused);
});

