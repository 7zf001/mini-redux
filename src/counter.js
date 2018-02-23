
const initState = {
	count: 0
}

const ADD_GUN = 'ADD_GUN'
const REMOVE_GUN = 'REMOVE_GUN'

// reducer 收纳器：根据action.type来返回并覆盖原始的state
export default function reducer (state = initState, action) {
	switch (action.type) {
		case REMOVE_GUN:
			return { ...state, count: state.count - 1}
		case ADD_GUN:
			return { ...state, count: state.count + 1}
		default:
			return initState
	}
}

export function addGun (a) {
	return {type: ADD_GUN}
}

export function removeGun () {
	return {type: REMOVE_GUN}
}

export function waitAdd () {
	return dispatch => {
		setTimeout(function () {
			dispatch({type: ADD_GUN})
		}, 2000)
	}
}

export function addTwice () {
	return [{type: ADD_GUN}, {type: ADD_GUN}]
}