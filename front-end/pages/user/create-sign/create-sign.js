// pages/user/create-sign/create-sign.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },

  onGetCode:function(){
    var url = app.globalData.baseUrl + '/sign/create';
    var token = app.globalData.token;
    var that = this;
    wx.request({
      url: url,
      method: 'POST',
      header: {
        token: token
      },
      data: {
        classname:"abc",
        expire:1,
        location:"abc"
      },
      success: function (res) {
        // console.log(res.data);
        wx.showToast({
          title: '获取成功',
          duration: 1000,
          icon: "success",
          mask: true
        });
        that.setData({
          code: res.data.roomnum
        });
        wx.setStorageSync('roomnum', res.data.roomnum);
      }
    })
  },

  onGetResult:function(){
    var that = this;
    var code = wx.getStorageSync('roomnum');
    var url = app.globalData.baseUrl + '/sign/show/' + code;
    var token = app.globalData.token;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        token: token
      },
      success: function (res) {
        // console.log(res.data);
        var result = res.data.study_id;
        var id = '';
        for (var i = 0; i < result.length; i++) {
          id += result[i] + '        ';
        }
        var num = res.data.people_num;
        that.setData({
          id: id,
          num: num
        })
      }
    })
  }
})