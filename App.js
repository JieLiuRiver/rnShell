/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {StackNavigator} from 'react-navigation'
import HomePage from './list'
import Actionsheet from './list/actionsheet'
import AntdMobile from './list/antdMobile'
import Fs from './list/fs'
import ReactNativeImagePicker from './list/reactNativeImagePicker'
import ReactNativeSwiper from './list/ReactNativeSwiper'
import PointerEvents from './list/PointerEvents'
import ScrollView from './list/ScrollView'
import ReactNativeWechat from './list/ReactNativeWechat'
import SignatureCapture from './list/SignatureCapture'
import ScrollableTabView from './list/ScrollableTabView'
import Refreshlist from './list/Refreshlist'

// import ReactNativeImageZoomViewer from './list/reactNativeImageZoomViewer'

export const AppStackNavigator = StackNavigator({
	  HomePage: {
	      screen: HomePage
	  },
	  Actionsheet: {
	      screen: Actionsheet
	  },
	  AntdMobile: {
	    screen: AntdMobile
	  },
	  Fs: {
	  	screen: Fs
	  },
	  ReactNativeImagePicker: {
	  	screen: ReactNativeImagePicker
	  },
		ReactNativeSwiper: {
			screen: ReactNativeSwiper
		},
		PointerEvents: {
			screen: PointerEvents
		},
		ScrollView: {
			screen: ScrollView
		},
		ReactNativeWechat: {
			screen: ReactNativeWechat
		},
		SignatureCapture: {
			screen: SignatureCapture
		},		
		ScrollableTabView: {
			screen: ScrollableTabView
		},
		Refreshlist: {
			screen: Refreshlist
		},
		/*
		ReactNativeImageZoomViewer: {
			screen: ReactNativeImageZoomViewer
		}
		*/
	},
	{
		navigationOptions: (props) => {
			const {navigation} = props;
	        const {state, setParams} = navigation;
	        const {params = {}} = state;
			return {
				title: params.title || '首页'
			}
		}
	}
)

export default AppStackNavigator
