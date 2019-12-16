import categoriesReducer from '../../reducers/categories';
import categories from '../fixtures/categories';

test('should setup default categories values', () => {
    const state = categoriesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should add a category', () => {
    const category = {
        title: 'test',
        description: '',
        color: '777777'
    };
    const action = {
        type: 'ADD_CATEGORY',
        category
    };
    const state = categoriesReducer(categories, action);
    expect(state).toEqual([...categories, category]);
});

test('should delete category by id', () => {
    const action = {
        type: 'REMOVE_CATEGORY',
        id: categories[0].id
    };
    const state = categoriesReducer(categories, action);
    expect(state).toEqual([categories[1], categories[2]]);
});

test('should not delete category if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = categoriesReducer(categories, action);
    expect(state).toEqual(categories);
});

test('should set categories', () => {
    const action = {
        type: 'SET_CATEGORIES',
        categories: [categories[0]]
    };
    const state = categoriesReducer(categories, action);
    expect(state).toEqual([categories[0]]);
});