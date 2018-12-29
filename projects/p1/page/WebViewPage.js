/**
 * WebViewPage
 * @flow
 **/
'use strict'
import React, {Component} from 'react'
import {
    WebView,
    View,
} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import SafeAreaViewPlus from '../common/SafeAreaViewPlus'
import GlobalStyles from '../res/styles/GlobalStyles'
import ViewUtils from '../util/ViewUtils'
import NavigatorUtil from '../util/NavigatorUtil'


export default class WebViewPage extends Component {
    constructor(props) {
        super(props);
        this.params=this.props.navigation.state.params;
        this.state = {
            url: this.params.url,
            canGoBack: false,
            title: this.params.title,
        }
    }

    onBackPress(e) {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigatorUtil.goBack(this.props.navigation)
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        });
    }

    render() {
        return (
            <SafeAreaViewPlus
                style={GlobalStyles.root_container}
                topColor={this.params.theme.themeColor}
            >
                <NavigationBar
                    navigator={this.props.navigator}
                    popEnabled={false}
                    style={this.params.theme.styles.navBar}
                    leftButton={ViewUtils.getLeftButton(()=>this.onBackPress())}
                    title={this.state.title}
                />
                <WebView
                    ref={webView=>this.webView=webView}
                    startInLoadingState={true}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    source={{uri: this.state.url}}/>
            </SafeAreaViewPlus>

        );
    }
}
