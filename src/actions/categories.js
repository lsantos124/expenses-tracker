import database from '../firebase/firebase';

// ADD_CATEGORY

export const addCategory = (category) => ({
	type: 'ADD_CATEGORY',
	category
});

export const startAddCategory = (categoryData = {}) => {
	return (dispatch, getState) => {
        const uid = getState().auth.uid;
		const {
            title = '',
			description = '',
			color = '' 
        } = categoryData;

		const category = { title, description, color };

		return database.ref(`users/${uid}/categories`).push(category).then((ref) => {
			dispatch(addCategory({
				id: ref.key,
				...category
			}));
		});
	};
};

// REMOVE CATEGORY

export const removeCategory = ({ id } = {}) => ({
	type: 'REMOVE_CATEGORY',
	id
});

export const startRemoveCategory = ({ id } = {}) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		return database.ref(`users/${uid}/categories/${id}`).remove().then(() => {
			dispatch(removeCategory({ id }));
		});
	};
};

// SET CATEGORY

export const setCategories = (categories) => ({
	type: 'SET_CATEGORIES',
	categories
});

export const startSetCategories = () => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		return database.ref(`users/${uid}/categories`)
			.once('value')
			.then((snapshot) => {
				const categories = [];

				snapshot.forEach((childSnapshot) => {
					categories.push({
						id: childSnapshot.key,
						...childSnapshot.val()
					});
				});

				dispatch(setCategories(categories));
			});
	};
};