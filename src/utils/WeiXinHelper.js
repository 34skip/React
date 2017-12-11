/**
 * Created by zhouchao on 17/1/5.
 */
import { Toast } from 'antd-mobile';
// import { routerRedux } from 'dva/router';
import { getSignPackage, getOpenid } from '../services/weixin';
import Storage from '../utils/Storage';
import { FRONTEND_DOMAIN } from '../constants';

async function init() {
  const { data } = await getSignPackage({ url: window.location.href });

  const sign = data;
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: sign.appId, // 必填，公众号的唯一标识
    timestamp: sign.timestamp, // 必填，生成签名的时间戳
    nonceStr: sign.nonceStr, // 必填，生成签名的随机串
    signature: sign.signature,  // 必填，签名，见附录1
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'hideMenuItems',
      'showMenuItems',
      'showAllNonBaseMenuItem',
      'hideAllNonBaseMenuItem',
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'uploadVoice',
      'downloadVoice',
      'playVoice',
      'onVoicePlayEnd',
      'pauseVoice',
      'stopVoice',
      'openLocation',
      'getLocation',
      'chooseWXPay',
      'chooseImage',
      'getLocalImgData',
    ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
}

async function weiChatLoginByOpenId() {
  const getQueryString = (name) => {
    const exp = `(^|&)${name}=([^&]*)(&|$)`;
    const reg = new RegExp(exp, 'i');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  };

  const code = getQueryString('code');

  const uid = getQueryString('uid');

  if (code != null) {

    const data = await getOpenid({ code, uid });

    if(data.status == 1){
      Storage.set('txhweb-authToken', data.authToken);
      Storage.set('txhweb-openid', data.data.openid);
      // routerRedux.push({pathname: '/'})
      // location.reload()
      history.go(0)
    }else{
      Storage.remove('txhweb-openid');
      Storage.remove('txhweb-authToken');
      // Toast.fail(data.msg);
      location.reload()
    }


  }else{

    let href = window.location.href;

    href = encodeURIComponent(href);
    window.location.href = `${FRONTEND_DOMAIN}site/direct-weixin-login?backUrl=${href}&uid=${uid}`;

  }
}
const WeiXinHelper = {
  init: () => init(),
  onMenuShareAppMessage: (title, desc, imgUrl, link, type = '', dataUrl = '') => {
    wx.showAllNonBaseMenuItem();
    // imgUrl = imgUrl == undefined ? baseUrl + 'mobile/images/letu.png' : imgUrl;
    // link = link == undefined ? window.location.href : link;
    wx.onMenuShareAppMessage({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接
      imgUrl, // 分享图标
      type, // 分享类型,music、video或link，不填默认为link
      dataUrl, //  如果type是music或video，则要提供数据链接，默认为空
      success() {
        // 用户确认分享后执行的回调函数
      },
      cancel() {
        // 用户取消分享后执行的回调函数
      },
    });
    const timeLineTitle = `${title}-${desc}`;
    wx.onMenuShareTimeline({
      title: timeLineTitle, // 分享标题
      link, // 分享链接
      imgUrl, // 分享图标
      success() {
        // 用户确认分享后执行的回调函数
      },
      cancel() {
        // 用户取消分享后执行的回调函数
      },
    });
  },
  uploadImg: (callBack) => {
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

        console.log(localIds)

        for(let i = 0; i < localIds.length; i++){

          wx.getLocalImgData({

            localId: localIds[i], // 图片的localID

            success: function (res, callback) {

              var localData = res.localData; // localData是图片的base64数据，可以用img标签显示

              if (localData.indexOf('base64') == -1) {

                localData = 'data:image/jgp;base64,' + localData; //解决android 部分手机没有base64 头

              }

              console.log(localData)
              callBack(localData)
            }
          })

        }


      }
    });
  },
  weiChatLoginByOpenId: () => weiChatLoginByOpenId(),
};
export default WeiXinHelper;
