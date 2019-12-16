import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
	addCategory, 
    startAddCategory,
    removeCategory,
    startRemoveCategory,
    setCategories,
    startSetCategories
} from '../../actions/categories';
import categories from '../fixtures/categories';
import database from '../../firebase/firebase';
import categoriesReducer from '../../reducers/categories';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid }};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
	const categoriesData = {};
	categories.forEach(({ id, title, description, color }) => {
		categoriesData[id] = { title, description, color };
	});
	database.ref(`users/${uid}/categories`).set(categoriesData).then(() => done());
});

// Add category tests

test('should setup add category action object with provided values', () => {
	const action = addCategory(categories[2]);
	expect(action).toEqual({
		type: 'ADD_CATEGORY',
		category: categories[2]
	});
});

test('should add category to database and store', (done) => {
	const store = createMockStore(defaultAuthState);
	const categoryData = {
        title: 'Charity',
		description: 'Donations',
		color: 'f6f6f6'
	};

	store.dispatch(startAddCategory(categoryData)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_CATEGORY',
			category: {
				id: expect.any(String),
				...categoryData
			}
		});

		return database.ref(`users/${uid}/categories/${actions[0].category.id}`).once('value');
	}).then((snapshot) => {
			expect(snapshot.val()).toEqual(categoryData);
			done();
	});;
});

test('should add category with defaults to database and store', (done) => {
	const store = createMockStore(defaultAuthState);

	const categoriesDefaults = {
		description: '',
		title: '',
		color: ''
	};

	store.dispatch(startAddCategory({})).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_CATEGORY',
			category: {
				id: expect.any(String),
				...categoriesDefaults
			}
		});

		return database.ref(`users/${uid}/categories/${actions[0].category.id}`).once('value');
	}).then((snapshot) => {
			expect(snapshot.val()).toEqual(categoriesDefaults);
			done();
	});;
});

// Remove category tests

test('should remove category by id', () => {
	const action = {
		type: 'REMOVE_CATEGORY', 
		id: categories[1].id
	};

	const state = categoriesReducer(categories, action);
	expect(state).toEqual([categories[0], categories[2]]);
});

test('should not remove category if id not found', () => {
	const action = {
		type: 'REMOVE_CATEGORY', 
		id: '-1'
	};

	const state = categoriesReducer(categories, action);
	expect(state).toEqual(categories);
});

test('should setup remove category action object', () => {
	const action = removeCategory({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_CATEGORY',
		id: '123abc'
	});
});

test('should remove categories from firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	const id = categories[0].id;
	store.dispatch(startRemoveCategory({id})).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'REMOVE_CATEGORY',
			id
		});
		return database.ref(`users/${uid}/categories/${id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toBeFalsy();
		done();
	});
});

// Set categories tests

test('should setup set category action object with data', () => {
	const action = setCategories(categories);
	expect(action).toEqual({
		type: 'SET_CATEGORIES',
		categories
	});
});

test('should fetch the categories from firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	store.dispatch(startSetCategories()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_CATEGORIES',
			categories
		});
		done();
	});
});
