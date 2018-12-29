/**
 * Created by penn on 2016/12/21.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    FlatList,
    RefreshControl,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import TrendingDialog, {TimeSpans} from '../common/TrendingDialog'
import BaseComponent from './BaseComponent'
import CustomThemePage from './my/CustomTheme'
import ActionUtils from '../util/ActionUtils'
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import TrendingRepoCell from '../common/TrendingRepoCell'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
import FavoriteDao from "../expand/dao/FavoriteDao"
import ViewUtils from '../util/ViewUtils'
import {FLAG_TAB} from './HomePage'
import MoreMenu, {MORE_MENU} from '../common/MoreMenu'
import ProjectModel from "../model/ProjectModel";
import Utils from '../util/Utils'

const API_URL = 'https://github.com/trending/';
const EVENT_TYPE_TIME_SPAN_CHANGE="EVENT_TYPE_TIME_SPAN_CHANGE";
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);
const dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
export default class TrendingPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
        this.state = {
            languages: [],
            isVisible: false,
            timeSpan: TimeSpans[0],
            theme: this.props.theme
        }
        this.loadLanguage();
    }

    loadLanguage() {
        this.languageDao.fetch().then((languages) => {
            if (languages) {
                this.setState({
                    languages: languages,
                });
            }
        }).catch((error) => {

        });
    }

    renderMoreView() {
        let params = {...this.props, fromPage: FLAG_TAB.flag_popularTab}
        return <MoreMenu
            ref="moreMenu"
            {...params}
            menus={[MORE_MENU.Custom_Language, MORE_MENU.Sort_Language, MORE_MENU.Share, MORE_MENU.Custom_Theme,
                MORE_MENU.About_Author, MORE_MENU.About]}
            onMoreMenuSelect={(e) => {
                if (e === MORE_MENU.Custom_Theme) {
                    this.setState({
                        customThemeViewVisible: true
                    })
                }
            }}
        />
    }

    showPopover() {
        this.dialog.show();
    }

    closePopover() {
        this.dialog.dismiss();
    }

    onSelectTimeSpan(timeSpan) {
        this.closePopover();
        DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE,this.state.timeSpan,timeSpan);
        this.setState({
            timeSpan: timeSpan
        })
    }

    renderTitleView() {
        return <View>
            <TouchableOpacity
                ref='button'
                underlayColor='transparent'
                onPress={() => this.showPopover()}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 18,
                        color: '#FFFFFF',
                        fontWeight: '400'
                    }}>趋势 {this.state.timeSpan.showText}</Text>
                    <Image
                        style={{width: 12, height: 12, marginLeft: 5}}
                        source={require('../res/images/ic_spinner_triangle.png')}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }

    renderCustomThemeView() {
        return (<CustomThemePage
            visible={this.state.customThemeViewVisible}
            {...this.props}
            onClose={() => this.setState({customThemeViewVisible: false})}
        />)
    }

    renderTrendingDialog() {
        return (
            <TrendingDialog
                ref={dialog => this.dialog = dialog}
                onSelect={(tab) => this.onSelectTimeSpan(tab)}/>
        )
    }

    render() {
        var statusBar = {
            backgroundColor: this.state.theme.themeColor
        }
        let navigationBar =
            <NavigationBar
                titleView={this.renderTitleView()}
                statusBar={statusBar}
                style={this.state.theme.styles.navBar}
                rightButton={ViewUtils.getMoreButton(() => this.refs.moreMenu.open())}
            />;
        let timeSpanView = null;

        let content = this.state.languages.length > 0 ?
            <ScrollableTabView
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                tabBarInactiveTextColor='mintcream'
                tabBarActiveTextColor='white'
                ref="scrollableTabView"
                tabBarBackgroundColor={this.state.theme.themeColor}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2}}
                                                      tabStyle={{height: 39}}/>}
            >
                {this.state.languages.map((reuslt, i, arr) => {
                    let language = arr[i];
                    return language.checked ? <TrendingTab key={i} tabLabel={language.name}
                                                           timeSpan={this.state.timeSpan} {...this.props}/> : null;
                })}
            </ScrollableTabView> : null;
        return <View style={styles.container}>
            {navigationBar}
            {content}
            {timeSpanView}
            {this.renderMoreView()}
            {this.renderCustomThemeView()}
            {this.renderTrendingDialog()}
        </View>
    }
}

class TrendingTab extends BaseComponent {
    constructor(props) {
        super(props);
        this.isFavoriteChanged = false;
        this.state = {
            projectModels: [],
            isLoading: false,
            favoriteKeys: [],
            theme: this.props.theme
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.listener = DeviceEventEmitter.addListener('favoriteChanged_trending', () => {
            this.isFavoriteChanged = true;
        });
        this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE, (from,to) => {
            this.loadData(to);
        });
        this.loadData(this.props.timeSpan);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        if (this.listener) {
            this.listener.remove();
        }
        if (this.timeSpanChangeListener) {
            this.timeSpanChangeListener.remove();
        }
    }

    onUpdateFavorite() {
        this.getFavoriteKeys();
    }

    onTabSelected(from,to){
        if (to===FLAG_TAB.flag_trendingTab&&this.isFavoriteChanged){
            this.isFavoriteChanged=false;
            this.getFavoriteKeys();
        }
    }

    onRefresh() {
        this.loadData(this.props.timeSpan, true);
    }

    /**
     * 更新ProjectItem的Favorite状态
     */
    flushFavoriteState() {
        let projectModels = [];
        let items = this.items;
        for (let i = 0, len = items.length; i < len; i++) {
            projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.state.favoriteKeys)));
        }
        this.updateState({
            isLoading: false,
            isLoadingFail: false,
            projectModels: projectModels,
        });
    }

    /**
     * 获取本地用户收藏的ProjectItem
     */
    getFavoriteKeys() {
        favoriteDao.getFavoriteKeys().then((keys) => {
            if (keys) {
                this.updateState({favoriteKeys: keys});
            }
            this.flushFavoriteState();
        }).catch((error) => {
            this.flushFavoriteState();
            console.log(error);
        });
    }

    updateState(dic) {
        if (!this) return;
        this.setState(dic);
    }

    loadData(timeSpan, isRefresh) {
        this.updateState({
            isLoading: true
        })
        let url = this.genFetchUrl(timeSpan, this.props.tabLabel);
        dataRepository
            .fetchRepository(url)
            .then(result => {
                this.items = result && result.items ? result.items : result ? result : [];
                this.getFavoriteKeys();
                if (!this.items || isRefresh && result && result.update_date && !Utils.checkDate(result.update_date)) {
                    return dataRepository.fetchNetRepository(url);
                }
            })
            .then((items) => {
                if (!items || items.length === 0) return;
                this.items = items;
                this.getFavoriteKeys();
            })
            .catch(error => {
                console.log(error);
                this.updateState({
                    isLoading: false
                });
            })
    }

    updateState(dic) {
        if (!this) return;
        this.setState(dic);
    }

    genFetchUrl(timeSpan, category) {//objective-c?since=daily
        return API_URL + category + '?' + timeSpan.searchText;
    }

    renderRow(data) {
        const projectModel = data.item;
        return <TrendingRepoCell
            key={projectModel.item.id}
            theme={this.state.theme}
            projectModel={projectModel}
            onSelect={() => ActionUtils.onSelectRepository({
                projectModel: projectModel,
                flag: FLAG_STORAGE.flag_trending,
                ...this.props,
                onUpdateFavorite: () => this.onUpdateFavorite(),
            })}
            onFavorite={(item, isFavorite) => ActionUtils.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_trending)}/>
    }

    render() {
        return <View style={styles.container}>
            <FlatList
                data={this.state.projectModels}
                renderItem={(data) => this.renderRow(data)}
                keyExtractor={item => ""+(item.item.id || item.item.fullName)}
                refreshControl={
                    <RefreshControl
                        title='Loading...'
                        titleColor={this.props.theme.themeColor}
                        colors={[this.props.theme.themeColor]}
                        refreshing={this.state.isLoading}
                        onRefresh={() => this.onRefresh()}
                        tintColor={this.props.theme.themeColor}
                    />
                }
            />
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tips: {
        fontSize: 20
    }
})
