import authReducer from '../../reducers/auth';

test('should set uid for log in', () =>{
	const action = {
		type: 'LOGIN', 
		uid: '1'
	};

	const state = authReducer({}, action);
	expect(state.uid).toBe(action.uid);
});

test('should clear uid log out', () => {
	const action = {
		type: 'LOGOUT'
	};

	const state = authReducer({ uid:'anything' }, action);
	expect(state).toEqual({});
});