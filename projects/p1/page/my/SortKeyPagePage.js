/**
 * 对Trending语言,Popular 关键字进行排序
 * @flow
 * **/

import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    View,
    Image,
    Text,
    Alert,
    DeviceEventEmitter
} from 'react-native'
import SortableListView from 'react-native-sortable-listview'
import SafeAreaViewPlus from '../../common/SafeAreaViewPlus'
import NavigationBar from '../../common/NavigationBar'
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import BackPressComponent from '../../common/BackPressComponent'
import {ACTION_HOME,FLAG_TAB} from '../HomePage'
import ArrayUtils from '../../util/ArrayUtils'
import NavigatorUtil from '../../util/NavigatorUtil'
import ViewUtils from '../../util/ViewUtils'

export default class SortKeyPage extends Component {
    constructor(props) {
        super(props);
        this.params=this.props.navigation.state.params;
        this.backPress=new BackPressComponent({backPress:(e)=>this.onBackPress(e)});
        this.dataArray = [];
        this.sortResultArray = [];
        this.originalCheckedArray = [];
        this.state = {
            checkedArray: []
        }
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        this.languageDao = new LanguageDao(this.params.flag);
        this.loadData();
    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }
    onBackPress(e){
        this.onBack();
        return true;
    }
    loadData() {
        this.languageDao.fetch().then((data)=> {
            this.getCheckedItems(data);
        }).catch((error)=> {
            console.log(error);
        });
    }

    getCheckedItems(dataArray) {
        this.dataArray = dataArray;
        let checkedArray = [];
        for (let i = 0, j = dataArray.length; i < j; i++) {
            let data = dataArray[i];
            if (data.checked)checkedArray.push(data);
        }
        this.setState({
            checkedArray: checkedArray
        })
        this.originalCheckedArray = ArrayUtils.clone(checkedArray);
    }

    getSortResult() {
        this.sortResultArray = ArrayUtils.clone(this.dataArray);
        for (let i = 0, j = this.originalCheckedArray.length; i < j; i++) {
            let item = this.originalCheckedArray[i];
            let index = this.dataArray.indexOf(item);
            this.sortResultArray.splice(index, 1, this.state.checkedArray[i]);
        }
    }

    onSave(haChecked) {
        if (!haChecked) {
            if (ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
                NavigatorUtil.goBack(this.props.navigation);
                return;
            }
        }
        this.getSortResult();
        this.languageDao.save(this.sortResultArray);
        var jumpToTab=this.params.flag===FLAG_LANGUAGE.flag_key?FLAG_TAB.flag_popularTab:FLAG_TAB.flag_trendingTab;
        DeviceEventEmitter.emit('ACTION_HOME',ACTION_HOME.A_RESTART,jumpToTab);
    }

    onBack() {
        if (!ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
            Alert.alert(
                '提示',
                '是否要保存修改呢?',
                [
                    {
                        text: '否', onPress: () => {
                        NavigatorUtil.goBack(this.props.navigation);
                    }
                    }, {
                    text: '是', onPress: () => {
                        this.onSave(true);
                    }
                }
                ]
            )
        } else {
            NavigatorUtil.goBack(this.props.navigation);
        }
    }

    render() {
        let title = this.params.flag === FLAG_LANGUAGE.flag_language ? '语言排序' : '标签排序';
        let navigationBar =
            <NavigationBar
                title={title}
                leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                style={this.params.theme.styles.navBar}
                rightButton={ViewUtils.getRightButton('保存',()=>this.onSave())}/>;
        return (
            <SafeAreaViewPlus style={styles.container}
                              topColor={this.params.theme.themeColor}
            >
                {navigationBar}
                <SortableListView
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={(e) => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                        this.forceUpdate();
                    }}
                    renderRow={row => <SortCell data={row} {...this.params}/>}
                />
            </SafeAreaViewPlus>
        )
    }

}

class SortCell extends Component {
    render() {
        return <TouchableHighlight
            underlayColor={'#eee'}
            style={this.props.data.checked ? styles.item : styles.hidden}
            {...this.props.sortHandlers}>
            <View style={{marginLeft: 10, flexDirection: 'row'}}>
                <Image source={require('./img/ic_sort.png')} resizeMode='stretch' style={[{
                    opacity: 1,
                    width: 16,
                    height: 16,
                    marginRight: 10,
                },this.props.theme.styles.tabBarSelectedIcon]}/>
                <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },
    hidden: {
        height: 0
    },
    item: {
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 50,
        justifyContent: 'center'
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
})
