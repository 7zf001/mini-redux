export default function thunk ({dispatch, getState}) {
	return next => action => {
		if (Object.prototype.toString.call(action) === '[object Function]') {
			return action(dispatch, getState)
		}
		return next(action)
	}
}