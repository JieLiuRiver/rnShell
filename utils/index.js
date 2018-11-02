
import react from "react";
import {Platform,Alert, AlertIOS, PermissionsAndroid, CameraRoll, Alert} from 'react-native';
import RNFS from 'react-native-fs'
import Permissions from 'react-native-permissions';
import { Toast} from 'antd-mobile-rn';


export const checkPermissions = type => {
  const mapName = {
    camera: '相机',
    photo: '图库',
    bluetooth: '蓝牙',
    storage: '存储'
  };

  return new Promise((resolve,reject)=>{
    debugger
    //安卓蓝牙不需要授权
    if(type=='bluetooth'&&Platform.OS=='android') resolve();
    //ios存储不需要授权
    if(type=='storage'&&Platform.OS=='ios') resolve();
    Permissions
        .request(type).then(res=>{
          if(res=='authorized'||res=='undetermined') resolve();
          else reject('拒绝授权');
        }).catch(()=>{
          Alert.alert('授权失败', tip,[{text: '请重新授权'}]);
          reject('授权失败');
        })
  });
}


/**
 * @desc 下载图片/视频到本地相册
 * @param uri 下载的资源路径
 * @param progressing 下载进度
 * @tipFlag Boolean 是否需要提示
 */
export const downloadFile = (uri, progressing = () => {}, tipFlag = true) => {
  if (!uri) return null;

  // 提示
  const tip = msg => {
    tipFlag && Toast.success(msg, 1)
  }

  // android下， 获取访问用户存储空间的权限
  const requestExternalStoragePermission =  async () => {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: '需获得您的存储授权',
          message: '获取授权后才能保存到相册哦',
        }
      )
  }

  // 把本地图片/视频 保存到用户相册中
  const saveVideoImageToPhoto = function (downloadDest) {
    var promise = CameraRoll.saveToCameraRoll(downloadDest);
    promise.then(function(result) {
        console.log('ok')
        tip('成功保存到相册')
    }).catch(function(error) {
        console.log('fail')
        tip('保存成功' + '\n' + 'file://' + downloadDest)
    });
  }

  return new Promise((resolve, reject) => {
      // Android IOS 路径不同
      let dirs = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath;
      const formUrl = uri;
      uri = uri.split('?')[0];
      const uriArr = uri.split('.')
      const isImageOrVideo = (/\w(\.gif|\.jpeg|\.png|\.jpg|\.bmp)/i.test(uri) || /\w+(.flv|.rvmb|.mp4|.avi|.wmv)$/.test(uri))
      const downloadDest = `${dirs}/${((Math.random() * 10000000) | 0)}.${uriArr[uriArr.length - 1]}`;

      const options = {
          fromUrl: formUrl,
          toFile: downloadDest,
          background: true,
          begin: (res) => {
              console.log('begin', res);
              console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
          },
          progress: (res) => {
            let pro = res.bytesWritten / res.contentLength;
            progressing && progressing(pro)
        }
      };
      tipFlag && Toast.info('保存中');
      try {
          const ret = RNFS.downloadFile(options);
          ret.promise.then(res => {
              console.log('success', res);
              console.log('file://' + downloadDest)
              // 保存到手机本地之后，再使用CameraRoll，把本地（视频/图片）保存到用户的相册里
              if (isImageOrVideo) {
                  if (Platform.OS === 'ios') {
                    saveVideoImageToPhoto(downloadDest)
                    resolve(res);
                  } else {
                    // 如果用户允许访问存储空间 - Android
                    requestExternalStoragePermission()
                      .then(pres => {
                        saveVideoImageToPhoto(downloadDest)
                        resolve(res);
                      })
                      .catch(perr => {
                        tip('保存成功' + '\n' + 'file://' + downloadDest)
                        console.error('Failed to request permission ', perr);
                        resolve(res);
                      })
                  }
              } else {
                tip('保存成功' + '\n' + 'file://' + downloadDest)
                resolve(res);
              }
          }).catch(err => {
              tip('保存失败')
              reject(new Error(err))
          });
      } catch (e) {
          tip('保存失败')
          reject(new Error(e))
      }
  })
}
