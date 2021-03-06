const categoriesReducerDefaultState = [];

export default (state = categoriesReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_CATEGORY':
			return [
				...state,
				action.category
			];
		case 'REMOVE_CATEGORY':
			return state.filter(({id}) => id !== action.id)
		case 'SET_CATEGORIES':
			return action.categories;
		default:
			return state;
	}
};