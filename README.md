
#### 解决

- ![React Native不同设备分辨率适配和设计稿尺寸单位px的适配](http://www.51xuediannao.com/javascript/6ae418cb.html)

- !['React/RCTAssert.h' file not found](https://www.cnblogs.com/shihao905/p/9296367.html)


- Android Bundle
```
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```


- react-native-image-crop-picker  android 坑

```
# 配置教程地址
https://blog.csdn.net/sinat_17775997/article/details/74908864

# 编译 react-native-image-crop-picker 报错：Could not find com.github.yalantis:ucrop:2.2.1-native
缺少maven源， /android/build.gradle，并行配置多个 maven 源：
allprojects {
    repositories {
        mavenLocal()
        jcenter()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
        maven {
            url "https://jitpack.io"
        }
        maven {
            url 'https://maven.google.com/'
            name 'Google'
        }  
    }
}

# Cannot fit requested classes in a single dex file. Try supplying a main-dex list   有个限制不能大于xxx个方法
defaultConfig {
    multiDexEnabled true
}
```


- react-native-parallax-scroll-view
![](https://raw.githubusercontent.com/i6mi6/react-native-parallax-scroll-view/master/demo.ios.0.17.2.gif)


- android 报错 Invoke-customs are only supported starting with Android O (--min-api 26)

```
# android/build.gradle加上
compileOptions {

    sourceCompatibility JavaVersion.VERSION_1_8

    targetCompatibility JavaVersion.VERSION_1_8

}
```