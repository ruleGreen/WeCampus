// pages/user/sign/sign.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    KeyboardInputCode: '',
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

  InputCode: function (e) {
    // console.log(e.detail.value);
    this.data.KeyboardInputCode = e.detail.value;
  },

  onTapSign:function(){
    var url = app.globalData.baseUrl + '/sign';
    var token = app.globalData.token;
    var that = this;
    if (!that.data.KeyboardInputCode) {
      wx.showModal({
        confirmColor: '#1F4BA5',
        cancelColor: '#7F8389',
        title: '警告',
        content: '签到码不能为空',
      })
      return false;
    }
    wx.request({
      url: url,
      method: 'POST',
      header: {
        token: token
      },
      data: {
        location:"abc",
        roomnum: that.data.KeyboardInputCode
      },
      success: function (res) {
        // console.log(res.data);
        var flag = 0;
        for (var i in res.data) {
          if (i == "error_code")
            flag = 1;
        };
        if (flag == 1) {
          if(res.data.error_code == 10000){
            wx.showModal({
              confirmColor: '#1F4BA5',
              cancelColor: '#7F8389',
              title: '错误',
              content: 签到码不能为空,
            })
          }
          else{
            wx.showModal({
              confirmColor: '#1F4BA5',
              cancelColor: '#7F8389',
              title: '错误',
              content: res.data.msg,
            })
          }
          return false;
        }
        wx.showToast({
          title: '签到成功',
          duration: 1000,
          icon: "success",
          mask: true
        })
      }
    })
  }
})