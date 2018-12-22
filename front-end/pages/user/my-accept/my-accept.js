// pages/user/my-accept/my-accept.js
import { DBPost } from '../../../db/DBPost.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PtAcceptList: [],
    hidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  getData: function () {
    var token = app.globalData.token;
    var that = this;
    var url = app.globalData.baseUrl + '/user/receive';
    wx.request({
      url: url,
      method: 'GET',
      header: {
        token: token
      },
      success: function (res) {
        console.log(res.data);
        that.getPtAcceptData(res.data.data);
      }
    })
  },

  getPtAcceptData: function (data) {
    var post = [];
    for (var idx in data) {
      var subject = data[idx];
      console.log(subject);
      var temp = {
        avatar: subject.user.headimg,
        author: subject.user.nickname,
        date: subject.create_time,
        price: subject.price,
        content: subject.describe,
        rank: subject.user.judge,
        typeNum: 4,
        postId: subject.id,
        state: subject.status,
        address: subject.destination,
        school: subject.user.school.name,
        ranked:subject.ranked
      };
      post.push(temp);
    }
    this.setData({
      hidden: true
    })
    this.setData({
      PtAcceptList: post
    });
    wx.setStorage({
      key: 'PtAcceptList',
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

  onTapToPtDetail(event) {
    var postId = event.currentTarget.dataset.postId;
    wx.redirectTo({
      url: '../../../pages/community/pt-detail/pt-detail?id=' + postId +'&type=4',
    })
  }
})