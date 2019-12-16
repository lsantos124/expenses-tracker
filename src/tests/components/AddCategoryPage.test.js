import React from 'react';
import { shallow } from 'enzyme';
import { AddCategoryPage } from '../../components/AddCategoryPage';
import categories from '../fixtures/categories';

test('should render AddCategoryPage correctly', () => {
    const wrapper = shallow(<AddCategoryPage categories={categories}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should set title on input change', () => {
    const value = categories[0].title;
    const wrapper = shallow(<AddCategoryPage categories={categories}/>);
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('title')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    const value = categories[0].description;
    const wrapper = shallow(<AddCategoryPage categories={categories}/>);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    const value = 'new title';
    const history = { push: jest.fn() };
    const startAddCategory = jest.fn();
    const wrapper = shallow(<AddCategoryPage categories={categories} history={history} startAddCategory={startAddCategory}/>);
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('title')).toBe(value);

    const e = { preventDefault: jest.fn() };
    wrapper.find('form').prop('onSubmit')(e);
	expect(history.push).toHaveBeenLastCalledWith('/customize');
	expect(startAddCategory).toHaveBeenLastCalledWith({
        title: value,
        description: '',
        color: ''
    });
});

test('should generate error message if no category provided', () => {
    const wrapper = shallow(<AddCategoryPage categories={categories}/>);
    const e = { preventDefault: jest.fn() };
    wrapper.find('form').prop('onSubmit')(e);
	expect(wrapper.state('error')).toBe('Please provide category title');
});

test('should generate error message if category exists', () => {
    const value = categories[0].title;
    const history = { push: jest.fn() };
    const startAddCategory = jest.fn();
    const wrapper = shallow(<AddCategoryPage categories={categories} history={history} startAddCategory={startAddCategory}/>);
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('title')).toBe(value);

    const e = { preventDefault: jest.fn() };
    wrapper.find('form').prop('onSubmit')(e);
    expect(wrapper.state('error')).toBe('Category already exists!');
});