// pages/frontpage/frontpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.getUserInfo({
          success: function (res) {
            // console.log(res);
            wx.setStorageSync('user', res.userInfo);
            getApp().globalData.g_userInfo = wx.getStorageSync('user');
          },
          fail: function (res) {
            // console.log(res);
          }
        })

        /**登入接口 */
        wx.request({
          url: getApp().globalData.baseUrl + '/token/user',
          data: {
            code: code
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          success: function (res) {
            // console.log(res.data);
            getApp().globalData.token = res.data.token;
            // console.log(getApp().globalData.token);
            //通过返回的pass改变用户状态位
            if (res.data.pass == true) {
              getApp().globalData.existence = 1;
            }
            else getApp().globalData.existence = 0;
            that.setData({
              hidden:true
            })
            wx.redirectTo({
              url: '../welcome/welcome',
            })
          },
          fail: function (res) {
            console.log(res.data);
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})