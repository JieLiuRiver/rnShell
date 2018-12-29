/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {StackNavigator, createStackNavigator} from 'react-navigation'
import List from './list'
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
import QRCodeScanner from './list/QRCodeScanner'
import ReactNativePicker from './list/ReactNativePicker'
import ImageCropPicker from './list/ImageCropPicker'
import ReactNativeImageZoomViewer from './list/reactNativeImageZoomViewer'
import Animatable from './list/Animatable'
import Progress from './list/Progress'
import VectorIcons from './list/VectorIcons'
import KeyboardAwareScrollView from './list/KeyboardAwareScrollView'
import Flex from './list/Flex'
import DatePicker from './list/DatePicker'
import FontFamily from './list/FontFamily'
import SwipeableFlatList from './list/SwipeableFlatList'
import SectionList from './list/SectionList'
import AndroidBack from './list/AndroidBack'
import ReactNativeUiLib from './MineReactNativeUiLib/examples'
import ReactAutobind from './list/ReactAutobind'
import NativeEcharts from './list/ReactNativeChart'
import Project1 from './projects/p1'
import HomePage2 from './projects/p1/page/HomePage'
import RepositoryDetail from './projects/p1/page/RepositoryDetail'
import SearchPage from './projects/p1/page/SearchPage'
import CustomKeyPage from './projects/p1/page/my/CustomKeyPage'
import FavoritePage from './projects/p1/page/FavoritePage'
import WebViewPage from './projects/p1/page/WebViewPage'
import CustomTheme from './projects/p1/page/my/CustomTheme'
import MyPage from './projects/p1/page/my/MyPage'
import SortKeyPagePage from './projects/p1/page/my/SortKeyPagePage'
import AboutMePage from './projects/p1/page/about/AboutMePage'
import AboutPage from './projects/p1/page/about/AboutPage'

import MineUi_View from './MineReactNativeUiLib/examples/View'
import MineUi_Text from './MineReactNativeUiLib/examples/Text'

export const AppStackNavigator = createStackNavigator({
	  HomePage: {
	      screen: List
	  },
	  Actionsheet: {
	      screen: Actionsheet
	  },
	  AntdMobileRn: {
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
		QRCodeScanner: {
			screen: QRCodeScanner
		},		
		ReactNativePicker: {
			screen: ReactNativePicker
		},
		ImageCropPicker: {
			screen: ImageCropPicker
		},
		ReactNativeImageZoomViewer: {
			screen: ReactNativeImageZoomViewer
		},
		Animatable: {
			screen: Animatable
		},
		Progress: {
			screen: Progress
		},
		VectorIcons: {
			screen: VectorIcons
		},
		KeyboardAwareScrollView: {
			screen: KeyboardAwareScrollView
		},
		Flex: {
			screen: Flex
		},
		DatePicker: {
			screen: DatePicker
		},
		FontFamily: {
			screen: FontFamily
		},
		SwipeableFlatList: {
			screen: SwipeableFlatList
		},
		SectionList: {
			screen: SectionList
		},
		AndroidBack: {
			screen: AndroidBack
		},
		ReactNativeUiLib: {
			screen: ReactNativeUiLib
		},
		ReactAutobind: {
			screen: ReactAutobind
		},
		NativeEcharts: {
			screen: NativeEcharts
		},
		MineUi_View: {screen: MineUi_View},
		MineUi_Text: {screen: MineUi_Text},
		HomePage2: {
	        screen: HomePage2
	    },
	    RepositoryDetail: {
	    	screen: RepositoryDetail
	    },
	    SearchPage: {
	        screen: SearchPage
	    },
	    CustomKeyPage: {
	        screen: CustomKeyPage
	    },
	    FavoritePage: {
	        screen: FavoritePage
	    },
	    WebViewPage: {
	        screen: WebViewPage
	    },
	    CustomTheme: {
	        screen: CustomTheme
	    },
	    MyPage: {
	        screen: MyPage
	    },
	    SortKeyPagePage: {
	        screen: SortKeyPagePage
	    },
	    AboutMePage: {
	        screen: AboutMePage
	    },
	    AboutPage: {
	        screen: AboutPage
	    }
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
