/**
 * Created by penn on 2016/12/21.
 */

import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    DeviceInfo,
    View,
    TextInput,
    TouchableOpacity,
    Platform,
    FlatList,
    ActivityIndicator,
    DeviceEventEmitter
} from "react-native";
import Toast, {DURATION} from "react-native-easy-toast";
import {ACTION_HOME} from './HomePage'
import SafeAreaViewPlus from '../common/SafeAreaViewPlus'
import BackPressComponent from '../common/SafeAreaViewPlus'
import GlobalStyles from "../res/styles/GlobalStyles";
import RepositoryCell from '../common/RepositoryCell'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
import ActionUtils from '../util/ActionUtils'
import NavigatorUtil from '../util/NavigatorUtil'
import makeCancelable from '../util/Cancleable'
import ProjectModel from '../model/ProjectModel'
import Utils from '../util/Utils'
import FavoriteDao from '../expand/dao/FavoriteDao'
import {FLAG_STORAGE} from '../expand/dao/DataRepository'
import ViewUtils from "../util/ViewUtils";

const API_URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.backPress = new BackPressComponent({backPress: (e) => this.onBackPress(e)});
        this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
        this.favoriteKeys = [];
        this.keys = [];
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.isKeyChange = false;
        this.state = {
            rightButtonText: '搜索',
            isLoading: false,
            showBottomButton: false,
            projectModels: []
        }
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        this.initKeys();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
        if (this.isKeyChange) {
            DeviceEventEmitter.emit('ACTION_HOME', ACTION_HOME.A_RESTART);
        }
        this.cancelable && this.cancelable.cancel();
    }

    onBackPress(e) {
        this.onBack();
        return true;
    }

    /**
     * 添加标签
     */
    saveKey() {
        let key = this.inputKeky;
        if (this.checkKeyIsExist(this.keys, key)) {
            this.toast.show(key + '已经存在', DURATION.LENGTH_LONG);
        } else {
            key = {
                "path": key,
                "name": key,
                "checked": true
            };
            this.keys.unshift(key);
            this.languageDao.save(this.keys);
            this.toast.show(key.name + '保存成功', DURATION.LENGTH_LONG);
            this.isKeyChange = true;
        }
    }

    /**
     * 获取所以标签
     */
    async initKeys() {
        this.keys = await this.languageDao.fetch();
    }

    /**
     * 检查key是否存在于keys中
     * @param keys
     * @param key
     */
    checkKeyIsExist(keys, key) {
        for (let i = 0, l = keys.length; i < l; i++) {
            if (key.toLowerCase() === keys[i].name.toLowerCase()) return true;
        }
        return false;
    }

    /**
     * 更新ProjectItem的Favorite状态
     */
    flushFavoriteState() {
        let projectModels = [];
        let items = this.items;
        for (var i = 0, len = items.length; i < len; i++) {
            projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.favoriteKeys)));
        }
        this.updateState({
            isLoading: false,
            projectModels: projectModels,
            rightButtonText: '搜索'
        });
    }

    /**
     * 获取本地用户收藏的ProjectItem
     */
    getFavoriteKeys() {
        this.favoriteDao.getFavoriteKeys().then((keys) => {
            this.favoriteKeys = keys || [];
            this.flushFavoriteState();
        }).catch((error) => {
            this.flushFavoriteState();
            console.log(error);
        });
    }

    loadData() {
        this.updateState({
            isLoading: true,

        })
        this.cancelable = makeCancelable(fetch(this.genFetchUrl(this.inputKeky)));
        this.cancelable.promise
            .then(response => response.json())
            .then(responseData => {
                if (!this || !responseData || !responseData.items || responseData.items.length === 0) {
                    this.toast.show(this.inputKeky + '什么都没找到', DURATION.LENGTH_LONG);
                    this.updateState({isLoading: false, rightButtonText: '搜索'})
                    return;
                }
                this.items = responseData.items;
                this.getFavoriteKeys();
                if (!this.checkKeyIsExist(this.keys, this.inputKeky)) {
                    this.updateState({showBottomButton: true})
                }
            }).catch(e => {
            this.updateState({
                isLoading: false,
                rightButtonText: '搜索'
            })
        })
    }

    genFetchUrl(key) {
        return API_URL + key + QUERY_STR;
    }

    onBackPress() {
        this.refs.input.blur();
        NavigatorUtil.goBack(this.props.navigation);
        return true;
    }

    updateState(dic) {
        this.setState(dic)
    }

    onRightButtonClick() {
        if (this.state.rightButtonText === '搜索') {
            this.updateState({rightButtonText: '取消'})
            this.loadData();
        } else {
            this.updateState({
                rightButtonText: '搜索',
                isLoading: false
            })
            this.cancelable.cancel();
        }
    }

    renderNavBar() {
        let backButton = ViewUtils.getLeftButton(() => this.onBackPress());
        let inputView = <TextInput
            ref="input"
            onChangeText={text => this.inputKeky = text}
            style={styles.textInput}
        >
        </TextInput>
        let rightButton =
            <TouchableOpacity
                onPress={() => {
                    this.refs.input.blur();
                    this.onRightButtonClick();
                }}
            >
                <View style={{marginRight: 10}}>
                    <Text style={styles.title}>{this.state.rightButtonText}</Text>
                </View>
            </TouchableOpacity>
        return <View style={{
            backgroundColor: this.params.theme.themeColor,
            flexDirection: 'row',
            alignItems: 'center',
            height: (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios : GlobalStyles.nav_bar_height_android,
        }}>
            {backButton}
            {inputView}
            {rightButton}
        </View>
    }

    renderRow(data) {
        const projectModel = data.item;
        return <RepositoryCell
            key={projectModel.item.id}
            projectModel={projectModel}
            theme={this.params.theme}
            onSelect={() => ActionUtils.onSelectRepository({
                projectModel: projectModel,
                flag: FLAG_STORAGE.flag_popular,
                ...this.params
            })}
            onFavorite={(item, isFavorite) => ActionUtils.onFavorite(this.favoriteDao, item, isFavorite)}/>


    }

    render() {
        let statusBar = null;
        if (Platform.OS === 'ios'&&!DeviceInfo.isIPhoneX_deprecated) {
            statusBar = <View style={[styles.statusBar, {backgroundColor: this.params.theme.themeColor}]}/>
        }
        let listView = !this.state.isLoading ? <FlatList
            data={this.state.projectModels}
            renderItem={(e) => this.renderRow(e)}
            keyExtractor={item => "" + (item.item.id || item.item.fullName)}
        /> : null;
        let indicatorView = this.state.isLoading ?
            <ActivityIndicator
                style={styles.centering}
                size='large'
                animating={this.state.isLoading}
            /> : null;
        let resultView = <View style={{flex: 1}}>
            {indicatorView}
            {listView}
        </View>
        let bottomButton = this.state.showBottomButton ?
            <TouchableOpacity
                style={[styles.bottomButton, {backgroundColor: this.params.theme.themeColor}]}
                onPress={() => {
                    this.saveKey();
                }
                }
            >
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.title}>添加标签</Text>
                </View>
            </TouchableOpacity> : null;
        return <SafeAreaViewPlus
                topColor={this.params.theme.themeColor}
                bottomInset={true}
                style={GlobalStyles.root_container}
        >
            {statusBar}
            {this.renderNavBar()}
            {resultView}
            {bottomButton}
            <Toast ref={toast => this.toast = toast}/>
        </SafeAreaViewPlus>
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        // backgroundColor:'red'
    },
    statusBar: {
        height: 20,
    },
    textInput: {
        flex: 1,
        height: (Platform.OS === 'ios') ? 30 : 40,
        borderWidth: (Platform.OS === 'ios') ? 1 : 0,
        borderColor: "white",
        alignSelf: 'center',
        paddingLeft: 5,
        marginRight: 10,
        marginLeft: 5,
        borderRadius: 3,
        opacity: 0.7,
        color: 'white'
    },
    title: {
        fontSize: 18,
        color: "white",
        fontWeight: '500'
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    bottomButton: {
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
        height: 40,
        position: 'absolute',
        left: 10,
        top: GlobalStyles.window_height - 45-(DeviceInfo.isIPhoneX_deprecated?34:0)-(Platform.OS==='ios'?0:45),
        right: 10,
        borderRadius: 3
    }

});
