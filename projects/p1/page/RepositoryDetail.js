/**
 * RepositoryDetail
 * @flow
 **/
'use strict'
import React, {Component} from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    WebView,
    Platform,
    TouchableOpacity,
    Text,
    View,
} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import SafeAreaViewPlus from '../common/SafeAreaViewPlus'
import ViewUtils from '../util/ViewUtils'
import NavigatorUtil from '../util/NavigatorUtil'
import share from '../res/data/share.json'
import UShare from '../common/UShare'
import FavoriteDao from '../expand/dao/FavoriteDao'
import BackPressComponent from '../common/BackPressComponent'
const TRENDING_URL = 'https://github.com/'
export default class RepositoryDetail extends Component {
    constructor(props) {
        super(props);
        this.params=this.props.navigation.state.params;
        const {projectModel}=this.params;
        this.backPress=new BackPressComponent({backPress:(e)=>this.onBackPress(e)});
        this.url = projectModel.item.html_url ? projectModel.item.html_url
            : TRENDING_URL + projectModel.item.fullName;
        var title = projectModel.item.full_name ? projectModel.item.full_name
            : projectModel.item.fullName;
        this.favoriteDao = new FavoriteDao(this.params.flag);
        this.state = {
            url: this.url,
            canGoBack: false,
            title: title,
            isFavorite: projectModel.isFavorite,
            favoriteIcon: projectModel.isFavorite ? require('../res/images/ic_star.png') : require('../res/images/ic_star_navbar.png'),

        }
    }
    componentDidMount(){
        this.backPress.componentDidMount();
    }
    onBackPress(e){
        this.onBack();
        return true;
    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount();
        if (this.params.onUpdateFavorite)this.params.onUpdateFavorite();
    }

    setFavoriteState(isFavorite) {
        this.setState({
            isFavorite: isFavorite,
            favoriteIcon: isFavorite ? require('../res/images/ic_star.png') : require('../res/images/ic_star_navbar.png')
        })
    }

    onRightButtonClick() {//favoriteIcon单击回调函数
        var projectModel = this.params.projectModel;
        this.setFavoriteState(projectModel.isFavorite = !projectModel.isFavorite);
        var key = projectModel.item.fullName ? projectModel.item.fullName : projectModel.item.id.toString();
        if (projectModel.isFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item));
        } else {
            this.favoriteDao.removeFavoriteItem(key);
        }
    }

    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigatorUtil.goBack(this.props.navigation);
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        });
    }

    renderRightButton() {
        return (<View style={{flexDirection: 'row'}}>
                {ViewUtils.getShareButton(()=>{
                    var shareApp=share.share_app;
                    UShare.share(shareApp.title, shareApp.content,
                        shareApp.imgUrl,shareApp.url,()=>{},()=>{})
                })}
                <TouchableOpacity
                    onPress={()=>this.onRightButtonClick()}>
                    <Image
                        style={{width: 20, height: 20, marginRight: 10}}
                        source={this.state.favoriteIcon}/>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        var titleLayoutStyle=this.state.title.length>20?{paddingRight:30}:null;
        return (
            <SafeAreaViewPlus
                topColor={this.params.theme.themeColor}
                bottomInset={true}
            >
                <NavigationBar
                    leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                    popEnabled={false}
                    title={this.state.title}
                    titleLayoutStyle={titleLayoutStyle}
                    style={this.params.theme.styles.navBar}
                    rightButton={this.renderRightButton()}
                />
                <WebView
                    ref={webView=>this.webView = webView}
                    startInLoadingState={true}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    source={{uri: this.state.url}}/>
            </SafeAreaViewPlus>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
})
