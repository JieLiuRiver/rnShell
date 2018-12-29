import PropTypes from 'prop-types';
import {View as RNView, StyleSheet, ViewPropTypes, SafeAreaView} from 'react-native';
import React, { Component } from 'react'
import * as Constants from '../../helpers/constants'

const flexLayoutStyles = (() => {
  // flex_方向_主轴_侧轴
  const DIRECTIONS = ['row', 'column'],
        JUSTIFY_CONTENT_PROPVALUES = ['center', 'space-between', 'space-around', 'flex-start', 'flex-end', 'space-evenly'],
        JUSTIFY_CONTENT_NAMEVALUES = ['center', 'between', 'around', 'start', 'end', 'evenly'],
        ALIGN_ITEMMS_PROPVALUES = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
        ALIGN_ITEMMS_NAMEVALUES = ['start', 'end', 'center', 'baseline', 'stretch', 'between', 'around']
        DIVISION = '_'
        layoutStyles = {};
  let styleName = 'flex'
  DIRECTIONS.forEach((direction) => {
    const nameDir = styleName + DIVISION + direction
    JUSTIFY_CONTENT_PROPVALUES.forEach((jItem, jIdx) => {
      const nameJust = nameDir + DIVISION + JUSTIFY_CONTENT_NAMEVALUES[jIdx]
      ALIGN_ITEMMS_PROPVALUES.forEach((aItem, aIdx) => {
        const nameAlig = nameJust + DIVISION + ALIGN_ITEMMS_NAMEVALUES[aIdx]
        layoutStyles[nameAlig] = {
          flexDirection: direction,
          justifyContent: jItem,
          alignItems: aItem
        }
      })
    })
  })
  layoutStyles['flex_center'] = layoutStyles['flex_column_center_center']
  layoutStyles['flex_row_center'] = layoutStyles['flex_row_center_center']
  layoutStyles['flex_column_center'] = layoutStyles['flex_column_center_center']
  return layoutStyles
})()

const BACKGROUND_PATTERN = /^bg-([0-9a-fA-F]{6}|[0-9a-fA-F]{3})|(aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow)$/
const BORDER_RADIUS_PATTERN = /^br-[0-9]+$/
const WIDTH_PATTERN = /^width-[0-9]+$/
const HEIGHT_PATTERN = /^height-[0-9]+$/
const MARGIN_PATTERN = /^margin[LTRB]?-[0-9]+$/
const FLEX_VALUE_PATTERN = /^flex-[0-9]+$/
const FLEX_PATTERN = /^flex-.+$/
const PADDING_PATTERN = /^padding[LTRB]?-[0-9]+$/
const PADDING_VARIATIONS = {
    padding: 'padding',
    paddingL: 'paddingLeft',
    paddingT: 'paddingTop',
    paddingR: 'paddingRight',
    paddingB: 'paddingBottom',
    paddingH: 'paddingHorizontal',
    paddingV: 'paddingVertical'
}
const MARGIN_VARIATIONS = {
	margin: 'margin',
	marginL: 'marginLeft',
	marginT: 'marginTop',
	marginR: 'marginRight',
	marginB: 'marginBottom',
	marginH: 'marginHorizontal',
	marginV: 'marginVertical'
}

export default class BetterView extends Component {

	static displayName = 'BetterView'

	static propTypes = {
		...ViewPropTypes,
		useSafeArea: PropTypes.bool
	}


	constructor(props) {
	  super(props);
	  this.state = {
	  	flexStyles: [],
	  	borderRadiusStyle: null,
	  	paddingStyle: null,
	  	marginStyle: null,
	  	backgroundColorStyle: null,
	  	whStyle: null
	  }
	}

	componentDidMount(){
		this.layoutStyles = flexLayoutStyles
		this.handleStyles()
	}

	_isEmptyObject(o){
      return (this.typeOf(o) === 'object' && JSON.stringify(o) === '{}')
    }

	handleStyles() {
		let flexStyles = []
		let borderRadiusStyle = {}
		let backgroundColorStyle = {}
		let paddingStyle = {}
		let marginStyle = {}
		let whStyle = {}
		const layoutArr = Object.keys(this.layoutStyles)
		for (let attr in this.props) {
			const attrArr = attr.split('-');
			// borderRadius
			BORDER_RADIUS_PATTERN.test(attr) && (borderRadiusStyle.borderRadius = parseInt(attrArr[1]))

			// paddingStyle、marginStyle、backgroundColor
			const attrPrefix = attrArr[0];
			PADDING_PATTERN.test(attr) && (paddingStyle[PADDING_VARIATIONS[attrPrefix]] = parseInt(attrArr[1]));
			MARGIN_PATTERN.test(attr) && (marginStyle[MARGIN_VARIATIONS[attrPrefix]] = parseInt(attrArr[1]));
			BACKGROUND_PATTERN.test(attr) && (backgroundColorStyle.backgroundColor = attrArr[1]);
			
			// height、width
			WIDTH_PATTERN.test(attr) && (whStyle.width = parseInt(attrArr[1]))
			HEIGHT_PATTERN.test(attr) && (whStyle.height = parseInt(attrArr[1]))

			// flex
			if (FLEX_PATTERN.test(attr)) {
				// flex-number
				if (FLEX_VALUE_PATTERN.test(attr)) {
					flexStyles.push({
						flex: parseInt(attrArr[1])
					})
				} 
				// flex-row-center
				else {
					const flexAttr = attr.replace(/-/g, '_')
					if (layoutArr.includes(flexAttr)) {
						flexStyles.push(this.layoutStyles[flexAttr])
					}	
				}
			}
		}
		this.setState({
			flexStyles,
			borderRadiusStyle,
			marginStyle,
			paddingStyle,
			backgroundColorStyle,
			whStyle
		})
	}


	render() {
		const {flexStyles, borderRadiusStyle, paddingStyle, marginStyle, backgroundColorStyle, whStyle} = this.state
		const { useSafeArea, style = {}, ...others } = this.props
		const Element = (useSafeArea && Constants.isIos) ? SafeAreaView : RNView
		return (
			<Element
					{...others}
					style={[...flexStyles, whStyle, borderRadiusStyle, paddingStyle, marginStyle, backgroundColorStyle, style]}
					ref={r => (this.view = r)}
				>
					{this.props.children}
			</Element>
		)
	}
}


const styles = StyleSheet.create({
	container: {},
	...flexLayoutStyles
})