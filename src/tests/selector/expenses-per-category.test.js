import getExpensesPerCategory from '../../selectors/expenses-per-category';
import categories from '../fixtures/categories';
import expenses from '../fixtures/expenses';

test('should return empty object if no expenses', () => {
    const results = getExpensesPerCategory([], []);
    expect(results).toEqual([]);
});

test('should correctly display one category', () => {
    const results = getExpensesPerCategory([expenses[0]], [categories[2]]);
    expect(results).toEqual([{
        angle: 1.95,
        color: 'f7f7f7',
        name: 'Bills'
    }]);
});

test('should correctly display multiple categories', () => {
    const results = getExpensesPerCategory(expenses, categories);
    expect(results).toEqual([{
            angle: 1.95,
            color: 'f7f7f7',
            name: 'Bills'
        }, {
            angle: 1095.00,
            color: '000000',
            name: 'Restaurants'
        }, {
            angle: 45.00,
            color: 'ffffff',
            name: 'Charity'
        }]);
});