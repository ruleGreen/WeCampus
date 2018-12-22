App({
  onLaunch: function () {
    // this._getUserInfo();
    // var that = this;
    // wx.login({
    //   success: function (res) {
    //     var code = res.code;
    //     wx.getUserInfo({
    //       success: function (res) {
    //         console.log(res);
    //         wx.setStorageSync('user', res.userInfo);
    //       },

    //       fail: function (res) {
    //         console.log(res);
    //       }
    //     })

    //     /**登入接口 */
    //     wx.request({
    //       url: getApp().globalData.baseUrl + '/token/user',
    //       data: {
    //         code: code
    //       },
    //       method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //       success: function (res) {
    //         console.log(res.data);
    //         getApp().globalData.token = res.data.token;
    //         console.log(getApp().globalData.token + '1111');
    //         //通过返回的pass改变用户状态位
    //         if (res.data.pass == true) {
    //           getApp().globalData.existence = 1;
    //         }
    //         else getApp().globalData.existence = 0;
    //       },
    //       fail: function (res) {
    //         console.log(res.data);
    //       }
    //     })
    //   }
    // })
    // this.globalData.g_userInfo = wx.getStorageSync('user');
    // wx.navigateTo({
    //   url: '../pages/welcome/welcome',
    // })

    // var storageData = wx.getStorageSync('postList');
    // this.globalData.existence = 1;
    // if (!storageData) {
    //   var dataObj = require("data/data.js")
    //   wx.clearStorageSync();
    //   wx.setStorageSync('postList', dataObj.postList);
    // }
    
  },
  _getUserInfo: function () {
    // var userInfoStorage = wx.getStorageSync('user');
    // if (!userInfoStorage) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        console.log(code);
        wx.getUserInfo({
          success: function (res) {
            console.log(res);
            wx.setStorageSync('user', res.userInfo);
          },

          fail: function (res) {
            console.log(res);
          }
        })

        /**登入接口 */
        wx.request({
          url: that.globalData.baseUrl + '/token/user',
          data: {
            code: code
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          success: function (res) {
            console.log(res.data);
            that.globalData.token = res.data.token;
            console.log(that.globalData.token + '1111');
            //通过返回的pass改变用户状态位
            if (res.data.pass == true) {
              that.globalData.existence = 1;
            }
            else that.globalData.existence = 0;
          },
          fail: function (res) {
            console.log(res.data);
          }
        })
      }
    })
    // }
    // else {
    //   this.globalData.g_userInfo = userInfoStorage;
    // }
  },
  globalData: {
    g_userInfo: null,
    baseUrl: 'http://39.106.77.236/tianzi/public/api/v1',
    // baseUrl: 'http://localhost/tianzi/public/api/v1',
    existence: 0,
    rank: 0,
    token: ''
  }
})