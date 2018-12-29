/**
 * 更多菜单
 * @flow
 */
'use strict';
import React, {Component} from 'react';

import {
    StyleSheet,
    Platform,
    TouchableOpacity,
    Image,
    Text,
    View,
    Linking,
    ViewPropTypes
} from 'react-native'
import CustomKeyPage from "../page/my/CustomKeyPage";
import SortKeyPagePage from "../page/my/SortKeyPagePage";
import {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import AboutPage from '../page/about/AboutPage'
import AboutMePage from '../page/about/AboutMePage'
import UShare from '../common/UShare'
import MenuDialog from '../common/MenuDialog'
import NavigatorUtil from '../util/NavigatorUtil'
import share from '../res/data/share.json'

export const MORE_MENU = {
    Custom_Language: {name: '自定义语言', icon: require('../page/my/img/ic_custom_language.png')},
    Sort_Language: {name: '语言排序', icon: require('../page/my/img/ic_swap_vert.png')},
    Custom_Theme: {name: '自定义主题', icon: require('../page/my/img/ic_view_quilt.png')},
    Custom_Key: {name: '自定义标签', icon: require('../page/my/img/ic_custom_language.png')},
    Sort_Key: {name: '标签排序', icon: require('../page/my/img/ic_swap_vert.png')},
    Remove_Key: {name: '标签移除', icon: require('../page/my/img/ic_remove.png')},
    About_Author: {name: '关于作者', icon: require('../page/my/img/ic_insert_emoticon.png')},
    About: {name: '关于', icon: require('../res/images/ic_trending.png')},
    Website: {name: 'Website', icon: require('../res/images/ic_computer.png')},
    Feedback: {name: '反馈', icon: require('../res/images/ic_feedback.png')},
    Share: {name: '分享', icon: require('../res/images/ic_share.png')},
};
import PropTypes from 'prop-types';

export default class MoreMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static propTypes = {
        contentStyle: ViewPropTypes.style,
        menus: PropTypes.array.isRequired,
    }

    /**
     * 打开更多菜单
     */
    open() {
        this.showPopover();
    }

    showPopover() {
        this.dialog.show();
    }

    closePopover() {
        this.dialog.dismiss();
    }

    onMoreMenuSelect(tab) {
        this.closePopover();
        if (typeof(this.props.onMoreMenuSelect) == 'function') this.props.onMoreMenuSelect(tab)
        let TargetComponent, params = {...this.props, menuType: tab};
        switch (tab) {
            case MORE_MENU.Custom_Language:
                TargetComponent = 'CustomKeyPage';
                params.flag = FLAG_LANGUAGE.flag_language;
                break;
            case MORE_MENU.Custom_Key:
                TargetComponent = 'CustomKeyPage';
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Remove_Key:
                TargetComponent = 'CustomKeyPage';
                params.isRemoveKey = true;
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Sort_Language:
                TargetComponent = 'SortKeyPagePage';
                params.flag = FLAG_LANGUAGE.flag_language;
                break;
            case MORE_MENU.Sort_Key:
                TargetComponent = 'SortKeyPagePage';
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Custom_Theme:

                break;
            case MORE_MENU.About_Author:
                TargetComponent = 'AboutMePage';
                break;
            case MORE_MENU.About:
                TargetComponent = 'AboutPage';
                break;
            case MORE_MENU.Feedback:
                var url = 'mailto://crazycodeboy@gmail.com';
                Linking.canOpenURL(url).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle url: ' + url);
                    } else {
                        return Linking.openURL(url);
                    }
                }).catch(err => console.error('An error occurred', err));
                break;
            case MORE_MENU.Share:
                var shareApp = share.share_app;
                UShare.share(shareApp.title, shareApp.content,
                    shareApp.imgUrl, shareApp.url, () => {
                    }, () => {
                    })
                break;
        }
        if (TargetComponent) {
            NavigatorUtil.goToMenuPage(params, TargetComponent)
        }

    }

    renderMoreView() {
        const {theme, menus} = this.props;
        return (
            <MenuDialog
                ref={dialog => this.dialog = dialog}
                menus={menus}
                theme={theme}
                onSelect={(tab) => this.onMoreMenuSelect(tab)}
            />
        );
    }

    render() {
        return this.renderMoreView();
    }
}
