
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  ViewPropTypes,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ViewPagerAndroid,
  Platform,
  StyleSheet,
  ActivityIndicator,
  PixelRatio,
  SectionList
} from 'react-native'
import moment from 'moment'

import Iconevil from 'react-native-vector-icons/EvilIcons';
import * as Animatable from 'react-native-animatable';

const getFlexLayoutStyles = () => {
  /*
    flex_方向_主轴_侧轴
  */
  const DIRECTIONS = ['row', 'column'],
        JUSTIFY_CONTENT_PROPVALUES = ['center', 'space-between', 'space-around', 'flex-start', 'flex-end', 'space-evenly'],
        JUSTIFY_CONTENT_NAMEVALUES = ['center', 'between', 'around', 'start', 'end', 'evenly'],
        ALIGN_ITEMMS_PROPVALUES = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
        ALIGN_ITEMMS_NAMEVALUES = ['start', 'end', 'center', 'baseline', 'stretch', 'between', 'around']
        DIVISION = '_'
        layoutStyles = {};
  let styleName = 'flex'
  DIRECTIONS.forEach((direction) => {
    // flex_row
    const nameDir = styleName + DIVISION + direction
    JUSTIFY_CONTENT_PROPVALUES.forEach((jItem, jIdx) => {
      // flex_row_center
      const nameJust = nameDir + DIVISION + JUSTIFY_CONTENT_NAMEVALUES[jIdx]
      ALIGN_ITEMMS_PROPVALUES.forEach((aItem, aIdx) => {
        // flex_row_center_center
        const nameAlig = nameJust + DIVISION + ALIGN_ITEMMS_NAMEVALUES[aIdx]
        layoutStyles[nameAlig] = {
          flexDirection: direction,
          justifyContent: jItem,
          alignItems: aItem
        }
      })
    })
  })
  return layoutStyles
}
const DEVICE_HEIGHT = parseFloat(Dimensions.get('window').height);
const DEVICE_WIDTH = parseFloat(Dimensions.get('window').width);

const MASK_OPACITY = 0.6
const MASK_HEIGHT = 150
const CONTENT_HEIGHT = DEVICE_HEIGHT - MASK_HEIGHT
const THEME_COLOR = '#2eb6a8'
const BORDER_COLOR = '#ccc'
const LIGHT_THEME_COLOR = '#e0f4f2'
const FORMAT_TYPE = 'YYYY-MM-DD'
const ENTER_WORD = '入住'
const LEAVE_WORD = '离店'
const WEEKS_CH = ['日', '一', '二', '三', '四', '五', '六']
const DAY_MAP = {
  [moment().format(FORMAT_TYPE)]: '今天',
  [moment().add(1, 'days').format(FORMAT_TYPE)]: '明天',
  [moment().add(2, 'days').format(FORMAT_TYPE)]: '后天'
}

const styles = StyleSheet.create({
  ...getFlexLayoutStyles(),
  container: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: `rgba(0,0,0,${MASK_OPACITY})`},
  contentBox: { height: CONTENT_HEIGHT, position: 'absolute', bottom: 0, left: 0, right: 0 },
  innerContent: {backgroundColor: '#fff', height: CONTENT_HEIGHT },
  shadowArea: {height: MASK_HEIGHT, position: 'absolute', top: 0, left: 0, right: 0, opacity: 0},
  headerViewBox: {width: DEVICE_WIDTH, backgroundColor: '#fff'},
  headerTitleView: {position:'relative', paddingTop: 10, paddingBottom: 5, width: DEVICE_WIDTH},
  headerCloseIcon: {},
  weeksView: {paddingTop: 5, paddingBottom: 10},
  weekItemView: {width: DEVICE_WIDTH / 7},
  submitView: {paddingTop: 10, paddingBottom: 10, paddingLeft: 16, paddingRight: 16, width: DEVICE_WIDTH, borderTopWidth: 1 / PixelRatio.get(), borderTopColor: BORDER_COLOR, backgroundColor: '#fff'},
  submitBtnView: {width: '100%', borderRadius: 4, height: 46, backgroundColor: THEME_COLOR},
  scrollView: {},
  contentScrollView: {width: DEVICE_WIDTH},
  panelView: {},
  panelHeaderView: {paddingTop: 10, paddingBottom: 10, borderTopWidth: 1 / PixelRatio.get(), borderTopColor: BORDER_COLOR, borderBottomWidth: 1 / PixelRatio.get(), borderBottomColor: BORDER_COLOR},
  panelDaysView: {flexWrap: 'wrap', width: DEVICE_WIDTH},
  panelDaysItemView: {width: parseInt((DEVICE_WIDTH / 7)), height: 50, borderBottomWidth: 1 / PixelRatio.get(), borderBottomColor: BORDER_COLOR, position: 'relative'},
  panelItemMask: {position: 'absolute', width: '100%', height: '100%', backgroundColor: '#fff', borderBottomWidth: 1 / PixelRatio.get(), borderBottomColor: BORDER_COLOR},
  startCell: {borderTopLeftRadius: 4, borderBottomLeftRadius: 4},
  endCell: {borderTopRightRadius: 4, borderBottomRightRadius: 4},
  containCell: {backgroundColor: LIGHT_THEME_COLOR},
  blankView: {backgroundColor: '#eee', height: 10},
  tipStyles: {borderRadius: 2, backgroundColor: '#6d6d6d', position: 'absolute', top: -25, left: -(80 - parseInt((DEVICE_WIDTH / 7))) /2, width: 80, height: 20},
  arrowStyles: {position: 'absolute', width: 6, height: 6, backgroundColor: '#6d6d6d', left: 37, bottom: -2, transform: [{rotate:'45deg'}]},
  nightCountView: {width: parseInt((DEVICE_WIDTH / 7)), left: 0}
})



export default class DatePicker extends Component{
	static propTypes = {
		visibile: PropTypes.bool,
    onConfirmSelected: PropTypes.func
	}

	static defaultProps = {
		visibile: false,
    onConfirmSelected: () => null
	}

	state = this.initState(this.props)

	initState({ visibile }) {
		const initState = {
			visibleStatus: visibile,
			availableMonths: [],
      hasLeaveDate: 0
		}	
		return initState
	}

  componentDidMount(){
    
  }

	componentWillReceiveProps(nextProps) {
		const { visibile } = nextProps
		const { availableMonths } = this.state
		if (availableMonths.length) {
			this.setState({
				visibleStatus: visibile
			}, () => {
				this.animationSlideInUp('fadeInUpBig')
			})
		} else {
			this.setState({
				visibleStatus: visibile,
				availableMonths: [
					this._getAvailableDays(moment().startOf('month'), 'today'),
					this._getAvailableDays(moment().month(moment().month() + 1).startOf('month')),
          this._getAvailableDays(moment().month(moment().month() + 2).startOf('month')),
          this._getAvailableDays(moment().month(moment().month() + 3).startOf('month')),
	        this._getAvailableDays(moment().month(moment().month() + 4).startOf('month')),
				]
			}, () => {
				this._checkDefaultSelected(() => {
					this.animationSlideInUp('fadeInUpBig')
				})
			})
		}
	}

	_getAvailableDays(time = moment(), type) {
	  const result = {}
      result.viewTime = this._setViewTime(time)
      // 计算今天是星期几
      const todayDayOfWeek = type == 'today' ? moment().format('E') : time.format('E')
      // 令时间变为当月1号的
      const firstDay = time.startOf('month')
      // 计算当月1号是星期几
      const firstDayOfWeek = firstDay.format('E')
      // 计算上个月多余时间
      const last = this._calDate(firstDay.subtract(firstDayOfWeek, 'days'), firstDayOfWeek)
      last.forEach(o => { o.visible = false })
      // 计算本月时间
      const current = this._calDate(firstDay, firstDay.daysInMonth())
      const fullMonths = [...last, ...current]
      let formatValue = (!!type && type === 'today')
        ? moment().format(FORMAT_TYPE)
        : result.viewTime.formatDay
      const todayIdx = fullMonths.findIndex(o => o.formatDay === formatValue)
      const todayRestOfMonth = fullMonths.slice(todayIdx)
      todayRestOfMonth.forEach(o => { o.visible = true })
      // 今天对应的一周，已过去的长度
      let currentTimeOrToday = !!type && type === 'today'
        ? moment()
        : moment(result.viewTime.formatDay)
      let daysOfTodayWeekPassed = this._calDate(currentTimeOrToday.subtract(parseInt(todayDayOfWeek), 'days'), todayDayOfWeek)
      daysOfTodayWeekPassed.forEach(o => {o.visible = false})
      if (!!type && type === 'today') {
        daysOfTodayWeekPassed.forEach((o, i) => {
          if (moment(o.formatDay).unix() >= moment().startOf('month').unix()) {
            o.visible = true
            // 置灰不可点状态
            o.disabled = true
          }
        })
      }
      result.days = this._supplement(result.viewTime.formatDay, [...daysOfTodayWeekPassed, ...todayRestOfMonth])
      return result
	}

	_calDate(time, length) {
      let arr = []
      for (let i = 0; i < length; i++) {
        arr.push(this._dealMoment(time))
        time.add(1, 'days')
      }
      return arr
    }

    _checkDefaultSelected(cb = () => {}) {
      const { availableMonths } = this.state
      let hasSelected = false
      availableMonths.forEach(o => {
        o.days.forEach(d => {
          if (!!o.selected) {
            hasSelected = true
          }
        })
      })
      if (!hasSelected) {
        availableMonths.forEach(o => {
          o.days.forEach(d => {
            if (d.formatDay == moment().format(FORMAT_TYPE)) {
              d = this._setEnterDate(d)
            }
          })
        })
        this.setState({ hasLeaveDate: 0 })
      }
      this.setState({
        availableMonths
      }, () => {
      	console.log('availableMonths', this.state.availableMonths)
      	cb()
      })
    }


    // 设置入住
    _setEnterDate(o) {
      o.selected = {
        type: 'enter',
        label: ENTER_WORD
      }
      return o
    }

    // 设置离店
    _setLeaveDate(o) {
      o.selected = {
        type: 'leave',
        label: LEAVE_WORD
      }
      return o
    }

    // 设置包含
    _setContainDate(o) {
      o.selected = {
        type: 'contain',
        label: ''
      }
      return o
    }

  // 补充剩余占位空格
  _supplement(formatDay, days) {
    const time = moment(formatDay).endOf('month')
    let whichWeek = time.format('E')
    whichWeek = parseInt(whichWeek) == 7 ? 0 : whichWeek
    const restCount = 7 - (parseInt(whichWeek) + 1)
    const placeholders = []
    for (let i = 0; i < restCount; i++) {
      placeholders.push({
        type: 'placeholders',
        visible: false,
        day: 0
      })
    }
    return [...days, ...placeholders]
  }

  _setViewTime(time = moment()) {
    return this._dealMoment(time)
  }

  _dealMoment(time) {
    let { years, months, date } = time.toObject()
    const wn = time.format('E')
    const formatDay = time.format(FORMAT_TYPE)
    return {
      year: years,
      month: months + 1,
      day: !!DAY_MAP[formatDay] ? DAY_MAP[formatDay] : date,
      weekCh: '周' + WEEKS_CH[wn == 7 ? 0 : wn],
      formatDay
    }
  }

  _uniq(array) {
      var temp = [];
      var index = [];
      var l = array.length;
      for (var i = 0; i < l; i++) {
        for (var j = i + 1; j < l; j++) {
          if (JSON.stringify(array[i]) === JSON.stringify(array[j])) {
            i++;
            j = i;
          }
        }
        temp.push(array[i]);
        index.push(i);
      }
      return temp;
  }

  _cleanAllSelectedDate(availableMonths){
    availableMonths.forEach(o => {
      o.days.forEach(d => {
        d.selected = null
      })
    })
    return availableMonths
  }


	animationSlideInUp(animationType = 'fadeInUpBig', cb = () => {}) {
		const {visibleStatus} = this.state
		if (!visibleStatus) return
	    this.ref && this.ref.animate(animationType, 300).then(() => {
	      cb()
	    })
	}

	onPressContainer() {
		this.animationSlideInUp('fadeOutDownBig', () => {
			this.setState({
				visibleStatus: false
			}, () => {
				this.props.onCancelDatePicker && this.props.onCancelDatePicker(this)
			})
		})
	}

  onPressDay(whichPanel, whichDay, dayItem) {
    if (!dayItem.visible || dayItem.disabled) return
    let { availableMonths } = this.state
    let currentItem = availableMonths[whichPanel].days[whichDay]
    let store = []
    availableMonths.forEach(o => {
      o.days.forEach(d => {
        if (!!d.selected) {
          store.push({
            ...d.selected,
            formatDay: d.formatDay
          })
        }
      })
    })
    store = this._uniq(store)
    if (!store.length || store.length > 1) {
      availableMonths = this._cleanAllSelectedDate(availableMonths)
      currentItem = this._setEnterDate(currentItem)
      this.setState({ hasLeaveDate: 0 })
    } else if (store.length == 1) {
      const eMoment = moment(currentItem.formatDay)
      const sMonent = moment(store[0].formatDay)
      if (store[0].formatDay !== currentItem.formatDay) {
        if (eMoment.unix() > sMonent.unix()) {
          currentItem = this._setLeaveDate(currentItem)
          availableMonths.forEach(o => {
            o.days.forEach(d => {
              if (moment(d.formatDay).unix() > sMonent.unix() && moment(d.formatDay).unix() < eMoment.unix()) {
                d = this._setContainDate(d)
              }
            })
          })
          this.setState({ hasLeaveDate: eMoment.diff(sMonent, 'days')})
          this.currentSelectedValues = {
            enter: store[0].formatDay,
            leave: currentItem.formatDay
          }
        } else {
          availableMonths.forEach(o => {
            o.days.forEach(d => {
              d.selected = null
            })
          })
          currentItem = this._setEnterDate(currentItem)
          this.setState({ hasLeaveDate: 0 })
        }
      }
    }
    this.setState({
      availableMonths
    })
  }

  onSubmitAction() {
    this.onPressContainer()
    console.log('ssssss')
    this.props.onConfirmSelected && this.props.onConfirmSelected(this.currentSelectedValues, this)
  }

	renderHeaderView() {
		return (
			<View style={[styles.flex_column_center_center, styles.headerViewBox]}>
				<View style={[styles.flex_row_between_center, styles.headerTitleView]}>
		            <TouchableOpacity onPress={this.onPressContainer.bind(this)}>
		            	<Iconevil style={[styles.headerCloseIcon]}
		                  name="close"
		                  color={THEME_COLOR}
		                  size={24}/>
		            </TouchableOpacity>
					<Text style={{fontSize: 16}}>选择日期</Text>
					<View style={{width: 26,height: 26}}></View>		
				</View>
				<View style={[styles.flex_row_start_center, styles.weeksView]}>
					{
						WEEKS_CH.map((o, i) => (
							<View style={[styles.flex_row_center_center, styles.weekItemView]} key={i}>
                <Text style={[(i == 0 || i == WEEKS_CH.length - 1) && {color: THEME_COLOR}]}>{o}</Text>
              </View>
						))
					}
				</View>
			</View>
		)
	}

	renderSubmitBtn() {
    const { availableMonths, hasLeaveDate } = this.state
    if (!hasLeaveDate) return null
		return (
			<View style={[styles.flex_row_center_center, styles.submitView]}>
				<TouchableOpacity style={[styles.flex_row_center_center, styles.submitBtnView]} onPress={this.onSubmitAction.bind(this)}>
					<Text style={{color: '#fff', fontSize: 16}}>完成</Text>
				</TouchableOpacity>
			</View>
		)
	}

	renderPanelItemView({ item, index, section }) {
		const { availableMonths, hasLeaveDate } = this.state
		const panels = []
		availableMonths.map((o, i) => {
			const { year, month } = o.viewTime
			panels.push(
				<View style={[styles.panelView]} key={i}>
					<View style={[styles.flex_row_start_center, styles.panelDaysView]}>
						{
							!!o.days.length && o.days.map((dItem, dIdx) => (
								<TouchableOpacity activeOpacity={(!dItem.visible || dItem.disabled) ? 1 : 0.5} onPress={this.onPressDay.bind(this, i, dIdx, dItem)} style={[styles.flex_column_center_center, styles.panelDaysItemView, (!!dItem.selected && !!dItem.visible) && {backgroundColor: THEME_COLOR}, (!!dItem.selected && dItem.selected.type == 'enter') && styles.startCell, (!!dItem.selected && dItem.selected.type == 'leave') && styles.endCell, (!!dItem.selected && dItem.selected.type == 'contain') && styles.containCell, (dIdx + 1)%7 == 0 && {width: DEVICE_WIDTH / 7 + 2.5}]} key={dIdx}>
									<Text style={[{fontSize: 14}, (!!dItem.selected && !!dItem.visible) && {color: '#fff'}, (!!dItem.selected && dItem.selected.type == 'contain') && {color: '#000'}, dItem.disabled && {color: '#ccc'}]}>{ dItem.day }</Text>
									{ (!!dItem.selected && dItem.selected.type !== 'contain') && (<Text style={[{fontSize: 10}, (!!dItem.selected && !!dItem.visible) && {color: '#fff'}]}>{ dItem.selected.label }</Text>)}
									{!dItem.visible && (<View style={styles.panelItemMask}></View>)}
                  {(!!dItem.selected && !hasLeaveDate && dItem.selected.type === 'enter') && (<View style={[styles.tipStyles, styles.flex_row_center_center]}><Text style={{color: '#fff', fontSize: 10}}>请选择离店日期</Text><View style={styles.arrowStyles}></View></View>)}
                  {(!!dItem.selected && !!hasLeaveDate && dItem.selected.type === 'leave') && (<View style={[styles.tipStyles, styles.flex_row_center_center, styles.nightCountView]}><Text style={{color: '#fff', fontSize: 10}}>共{ hasLeaveDate }晚</Text><View style={[styles.arrowStyles, {left: 25}]}></View></View>)}
								</TouchableOpacity>
							))
						}
					</View>
          {i !== availableMonths.length -1 && <View style={styles.blankView}></View>}
				</View>
			) 
		})
		return (
			<View style={{flex: 1}}>
				{panels}
			</View>
		)
	}

	renderContentView() {
    const { availableMonths, hasLeaveDate } = this.state
    availableMonths.map(item => {
      item.title = item.viewTime.year + '年' + ' ' + (item.viewTime.month < 10 ? '0' + item.viewTime.month : item.viewTime.month) + '月'
      item.data= item.days
    })
		return (
      <SectionList
        style={styles.scrollView}
        contentContainerStyle={styles.contentScrollView}
        renderItem={(e) => this.renderPanelItemView.call(this, e)}
        renderSectionHeader={({ section: { title, index } }) => (
          <View key={index} style={[styles.flex_row_center_center, styles.panelHeaderView]}><Text>{ title }</Text></View>
        )}
        sections={availableMonths}
        keyExtractor={(item, index) => item + index}
      />
		)
	}


	render () {
		const {visibleStatus} = this.state
		if (!visibleStatus) return null
		console.log('--------- availableMonths：', this.state.availableMonths)
		return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} style={[styles.shadowArea]} onPress={this.onPressContainer.bind(this)}></TouchableOpacity>
        <View
            style={[styles.contentBox]}>
          <Animatable.View 
            ref = {ref => this.ref = ref}
            style={[styles.flex_column_center_center, styles.innerContent]}>
            {this.renderHeaderView()}
            {this.renderContentView()}
            {this.renderSubmitBtn()}
          </Animatable.View>
        </View>
      </View>
		)
	}
}


/*

<ScrollView
  showsVerticalScrollIndicator={false}
  alwaysBounceVertical={true}
  style={styles.scrollView}
  contentContainerStyle={styles.contentScrollView}>
    {
      this.renderPanelItemView()
    }
</ScrollView>



          <View style={[styles.flex_row_center_center, styles.panelHeaderView]}>
            <Text>{ year + '年' + ' ' + (month < 10 ? '0' + month : month) + '月' }</Text>
          </View>
*/

