import React from 'react';
import { shallow } from 'enzyme';
import RemoveModal from '../../components/RemoveModal';

let handleDeleteExpense, handleCancelDeleteExpense, wrapper;

beforeEach(() => {
	handleDeleteExpense = jest.fn();
	handleCancelDeleteExpense = jest.fn();
	wrapper = shallow(
		<RemoveModal 
			delete={true}
			handleDeleteExpense={handleDeleteExpense} 
			handleCancelDeleteExpense={handleCancelDeleteExpense} 
		/>
	);
});

test('should render React Modal component correctly', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should call handleDeleteExpense', () => {
	wrapper.find('button').at(0).simulate('click');
	expect(handleDeleteExpense).toHaveBeenCalled();
});

test('should call handleCancelDeleteExpense', () => {
	wrapper.find('button').at(1).simulate('click');
	expect(handleCancelDeleteExpense).toHaveBeenCalled();
});