export function createStore (reducer /*收纳器函数*/, enhancer /*增强函数*/) {
	if (enhancer) {
		// 对createStore进行扩展
		// 依然是返回{getState, dispatch, subscribe}，但dispatch是进行过thunk进行包装
		return enhancer(createStore)(reducer) 
	}

	let state = {}
	let listeners = []
	
	// 返回state
	function getState () {
		return state
	}
	
	// 根据新的state和action返回并覆盖state
	function dispatch (action) {
		state = reducer(state, action)
		listeners.forEach( v => v() )
		return action
	}
	
	// 做订阅，存放在数组中，当dispatch被执行时，forEach调用执行订阅数组中每个函数
	function subscribe (listener) {
		listeners.push(listener)
	}
	
	// 初始化
	dispatch({type: '@@INIT-MINI-REDUX'})

	return {getState, dispatch, subscribe}
}

export function applyMiddleware (...middlewares /*多个中间件*/) {
	return createStore => (...args) => {
		const store = createStore(...args) // 返回{getState, dispatch, subscribe}
		let dispatch = store.dispatch

		// 中间件的接口
		const midApi = {
			getState: store.getState,
			dispatch: (...args) => dispatch(...args)
		}

		const middlewareChain = middlewares.map( middleware => middleware(midApi) )
		dispatch = compose(...middlewareChain)(store.dispatch)

		//dispatch = middleware(midApi)(store.dispatch)
		
		createStore = null // GC

		return {
			...store, // 将store对象展开
			dispatch // 将dispatch覆盖store.dispatch
		}
	}
}

// fn1(fn2(fn3))
export function compose(...funcs) {
	if (funcs.length === 0) {
		return arg => arg
	} else if (funcs.length === 1) {
		return funcs[0]
	} else {
		return funcs.reduce( (ret, item) => (...args) => ret(item(...args)))
	}
}

export function bindActionCreators (creators, dispatch) {
	let bound = []
	Object.keys(creators).forEach( v => {
		bound[v] = (...args) => dispatch(creators[v](...args))
	})
	return bound
}
