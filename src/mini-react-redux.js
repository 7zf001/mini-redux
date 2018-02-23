import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from './mini-redux'

// connect 负责链接组件，给到redux里的数据放到组件的属性里
// 1. 负责接收一个组件，把state里的数据放进去，返回一个组件
// 2. 数据变化的时候，能够通知组件
export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapComponent) => {
	return class ConnectComponet extends React.Component {
		static contextTypes = {
			store: PropTypes.object
		}
		constructor (props, context) {
			super(props, context)
			// this.state.props存放着redux的action和state并展开到this.props
			this.state = {
				props: {}
			}
		}
		
		componentDidMount () {
			const {store} = this.context
			// 订阅update函数
			store.subscribe( () => this.update() )
			this.update()
		}

		update () {
			const {store} = this.context
			const stateProps = mapStateToProps(store.getState())
			const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)

			this.setState({
				props: {
					...this.state.props,
					...stateProps,
					...dispatchProps,
				}
			})
		}

		render () {
			return <WrapComponent {...this.state.props} />
		}
	}
}

//  Provider, 把store 放到 context 里， 所有的子元素都可以直接获取store
/*
Provider作用是提供context到每个子类
将children Component包了一层
*/

export class Provider extends React.Component {
	static childContextTypes = {
		store: PropTypes.object
	}

	getChildContext () {
		return {store: this.store}
	}
	
	constructor (props, context) {
		super(props, context)
		this.store = props.store
	}

	render () {
		return this.props.children
	}
}