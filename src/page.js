import React, { Component } from 'react'
import { connect } from './mini-react-redux'
import {addGun, removeGun, waitAdd, addTwice} from './counter.js'

class Page extends Component {
	render() {
		return (
			<div>
				机枪数量：{this.props.count}
				<br/>
				<button onClick={() => this.props.addGun(1)}>+1</button>
				&nbsp;
				<button onClick={this.props.removeGun}>-1</button>
				&nbsp;
				<button onClick={this.props.waitAdd}>wait add</button>
				&nbsp;
				<button onClick={this.props.addTwice}>add twice</button>
			</div>
		)
	}
}

Page = connect(
	state => state,
	{addGun, removeGun, waitAdd, addTwice}
)(Page)

export default Page