import { createStore } from 'redux';

// ACTION GENERATORS - functions that return action objects

const incrementCount = ({ incrementBy = 1 } = {}) => ({
	type: 'INCREMENT',
	incrementBy
});

const decrementCount = ({ decrementBy = 1} = {}) => ({
	type: 'DECREMENT',
	decrementBy
});

const setCount = ({count}) => ({
	type: 'SET',
	count
});

const resetCount = () => ({
	type: 'RESET'
});

// Reducers
// 1. Reducers are pure functions
// 2. Never change state or action

// not a pure function, b/c interacting with vars outside of scope
// let a = 10;
// const add = (b) => {
// 	a + b;
// }

const countReducer = (state = { count: 0 }, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return {
				count: state.count + action.incrementBy
			};
		case 'DECREMENT':
			return {
				count: state.count - action.decrementBy
			};
		case 'SET':
			return {
				count: action.count
			};
		case 'RESET':
			return {
				count: 0
			};
		default:
			return state;
	}
};

const store = createStore(countReducer);

store.subscribe(() => {
	console.log(store.getState());
});

// Actions - object that gets sent to the store
//  ex. increment, decrement, rest
// store.dispatch({
// 	type: 'INCREMENT',
// 	incrementBy: 5
// });

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: 101 }));