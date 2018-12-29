
import PropTypes from 'prop-types';
import {Text as RNText, StyleSheet, ViewPropTypes} from 'react-native';
import React, { Component } from 'react'

const SIZE_PATTERN = /^size-[0-9]+$/
const WEIGHT_PATTERN = /^weight-(100|200|300|400|500|600|700|900)$/
const COLOR_PATTERN = /^color-([0-9a-fA-F]{6}|[0-9a-fA-F]{3})|(aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow)$/

export default class BetterText extends Component {

	static displayName = 'BetterText'

	state = {
		customStyles: {}
	}

	constructor(props) {
	  super(props)
	}

	componentDidMount(){
		this.handleStyles()
	}

	handleStyles() {
		let customStyles = {}
		for (let attr in this.props) {
			const attrArr = attr.split('-');
			SIZE_PATTERN.test(attr) && (customStyles.fontSize = parseInt(attrArr[1]))
			WEIGHT_PATTERN.test(attr) && (customStyles.fontWeight = attrArr[1])
			COLOR_PATTERN.test(attr) && (customStyles.color = attrArr[1])
		}
		this.setState({customStyles})
	}

	render(){
		const {style = {}, center, ...others} = this.props;
		const { customStyles } = this.state
		return (
			<RNText {...others} style={[!!center && {textAlign: 'center'}, customStyles, style]} ref={r => (this.text = r)}>
		        {this.props.children}
		    </RNText>
		)
	}

}