import React from 'react';
import { shallow } from 'enzyme';
import categories from '../fixtures/categories';
import { CustomizePage } from '../../components/CustomizePage';

let startRemoveCategory, wrapper;

beforeEach(() => {
	startRemoveCategory = jest.fn();
	wrapper = shallow(
		<CustomizePage 
            startRemoveCategory={startRemoveCategory} 
			categories={categories}
		/>
	);
});

test('should render CustomizePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should delete category', () => {
    wrapper.find('button').first().simulate('click');
    expect(startRemoveCategory).toHaveBeenCalledWith({
        id: categories[0].id
    });
});