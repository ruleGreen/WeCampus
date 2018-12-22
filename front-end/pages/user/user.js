// pages/user/user.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[
      { iconurl: '/images/icon/wx_app_post.png', title: '我的发布', tap: 'myPost' },
      { iconurl: '/images/icon/wx_app_local_accept.png', title: '我的接单', tap: 'myAccept' },
      { iconurl: '/images/icon/wx_app_word.png', title: '新的发布', tap: 'newPost' },
      { iconurl: '/images/icon/wx_app_image.png', title: '我的印象', tap: 'myImage' },
      { iconurl: '/images/icon/wx_app_schedule.png', title: '我的课表', tap: 'mySchedule' },
      { iconurl: '/images/icon/wx_app_sign.png', title: '课程签到', tap: 'sign' }
    ],
    device: [
      { iconurl: '/images/icon/wx_app_clear.png', title: '清理缓存', tap: 'clearCache' },
      { iconurl: '/images/icon/wx_app_message.png', title: '反馈', tap: 'Report' },
      { iconurl: '/images/icon/wx_app_about.png', title: '关于我们', tap: 'aboutUs' }
    ],
    UserList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.g_userInfo,
    });
    this.getUserData();
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

  //用户信息
  getUserData:function(){
    var token = app.globalData.token;
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/user',
      method: 'GET',
      header: {
        token: token
      },
      success: function (res) {
        that.setData({
          UserList: res.data
        })
        wx.setStorageSync('UserInfo', res.data);
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  },

  //显示modal窗口
  showModal: function (title, content, callback) {
    wx.showModal({
      title: title,
      content: content,
      confirmColor: '#1F4BA5',
      cancelColor: '#7F8389',
      success: function (res) {
        if (res.confirm) {
          callback && callback();
        }
      }
    })
  },

  //缓存清理
  clearCache: function () {
    this.showModal('缓存清理', '确定要清除本地缓存吗？', function () {
      wx.clearStorage({
        success: function (msg) {
          wx.showToast({
            title: "缓存清理成功",
            duration: 1000,
            mask: true,
            icon: "success"
          });
          wx.clearStorageSync();
        },
        fail: function (e) {
          console.log(e)
        }
      })
    });
  },

  //移动到我的发布
  myPost:function(){
    wx.navigateTo({
      url: 'my-post/my-post',
    })
  },

  //移动到我的接单
  myAccept:function(){
    wx.navigateTo({
      url: 'my-accept/my-accept',
    })
  },

  //移动到新的发布
  newPost:function(){
    wx.navigateTo({
      url: 'new-post/new-post',
    })
  },

  //移动到我的印象
  myImage:function(){
    wx.navigateTo({
      url: 'my-image/my-image',
    })
  },

  //移动到我的课表
  mySchedule:function(){
    wx.navigateTo({
      url: 'schedule/schedule',
    })
  },

  //移动到签到
  sign:function(){
    wx.navigateTo({
      url: 'select-sign/select-sign',
    })
  },

  //移动到关于我们
  aboutUs:function(){
    wx.navigateTo({
      url: 'aboutUs/aboutUs',
    })
  },

  //移动到反馈
  Report: function () {
    wx.navigateTo({
      url: 'issues/issues',
    })
  }
})