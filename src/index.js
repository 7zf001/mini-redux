import React from 'react'
import ReactDom from 'react-dom'
import reducer from './counter.js'
import { Provider, /*compose*/ } from './mini-react-redux'
import { createStore, applyMiddleware } from './mini-redux'
import thunk  from './mini-redux-thunk'
import thunkArray  from './mini-redux-array'
import Page from './page'

const store = createStore(reducer, applyMiddleware(thunk, thunkArray))

ReactDom.render(
	<Provider store={store}>
		<Page />
	</Provider>,
	document.getElementById('root')
)