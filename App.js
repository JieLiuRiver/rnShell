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
