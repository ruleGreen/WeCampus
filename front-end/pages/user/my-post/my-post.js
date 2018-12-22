// pages/user//my-post/my-post.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    XyPostList:[],
    PtPostList:[],
    hidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  getData: function () {
    var url = app.globalData.baseUrl + '/user/publish';
    var token = app.globalData.token;
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        token: token
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          hidden: true
        });
        that.getXyPostData(res.data.xianyu);
        that.getPtPostData(res.data.paotui);
      }
    })
  },

  //发布的闲鱼信息
  getXyPostData: function (data) {
    // console.log(this.data.hidden);
    var post = [];
    var UserInfo = wx.getStorageSync('UserInfo');
    for (var idx in data) {
      var subject = data[idx];
      var temp = {
        avatar: app.globalData.g_userInfo.avatarUrl,
        author: app.globalData.g_userInfo.nickName,
        date: subject.create_time,
        price: subject.price,
        content: subject.describe,
        rank: UserInfo.judge,
        detail: subject.detail,
        typeNum: 2,
        postImg:subject.img.url,
        postId: subject.id,
        state: subject.status,
        address: subject.destination,
        school: UserInfo.school.name
      };
      post.push(temp);
    }
    // console.log(post);
    this.setData({
      XyPostList: post
    });
    wx.setStorage({
      key: 'MyXyList',
      data: post,
    })
  },

  //发布的跑腿信息
  getPtPostData: function (data) {
    var post = [];
    var UserInfo = wx.getStorageSync('UserInfo');
    for (var idx in data) {
      var subject = data[idx];
      var temp = {
        avatar: app.globalData.g_userInfo.avatarUrl,
        author: app.globalData.g_userInfo.nickName,
        date: subject.create_time,
        price: subject.price,
        content: subject.describe,
        rank: UserInfo.judge,
        typeNum: 3,
        postId: subject.id,
        state: subject.status,
        address: subject.destination,
        school: UserInfo.school.name
      };
      post.push(temp);
    }
    // console.log(post);
    this.setData({
      PtPostList: post
    });
    wx.setStorage({
      key: 'MyPtList',
      data: post,
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
  
  },

  onTapToXyDetail(event) {
    var postId = event.currentTarget.dataset.postId;
    wx.redirectTo({
      url: '../../../pages/community/xy-detail/xy-detail?id=' + postId +'&type=2',
    })
  },

  onTapToPtDetail(event) {
    var postId = event.currentTarget.dataset.postId;
    wx.redirectTo({
      url: '../../../pages/community/pt-detail/pt-detail?id=' + postId +'&type=3',
    })
  }
})