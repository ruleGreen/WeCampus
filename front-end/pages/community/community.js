// pages/community/community.js
import { DBPost } from '../../db/DBPost.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['随 性', '跑 腿'],
    currentTab: 0,
    XyList:[],
    PtList:[],
    hidden: false
  },
  navbarTap: function (e) {
    this.onLoad();
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getXy();
    this.getPt();
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

  onTapToXyDetail(event){
    var postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: 'xy-detail/xy-detail?id=' + postId + '&type=0',
    })
  },

  onTapToPtDetail(event){
    var postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: 'pt-detail/pt-detail?id=' + postId + '&type=1',
    })
  },

  setXy:function(event){
    var data = [];
    for (var idx in event) {
      var subject = event[idx];
      var temp = {
        avatar: subject.user.headimg,
        author: subject.user.nickname,
        date: subject.create_time,
        price: subject.price,
        title: subject.title,
        postImg: subject.img.url,
        content: subject.summary,
        rank: subject.user.judge,
        detail: subject.detail,
        typeNum: 0,
        postId: subject.id,
        state: subject.status
      }
      data.push(temp);
    }
    // console.log(data);
    this.setData({
      XyList: data
    });
    wx.setStorage({
      key: 'XyList',
      data: data,
    })
  },

  setPt:function(event){
    var data = [];
    for (var idx in event) {
      var subject = event[idx];
      var temp = {
        avatar: subject.user.headimg,
        author: subject.user.nickname,
        date: subject.create_time,
        price: subject.price,
        content: subject.describe,
        rank: subject.user.judge,
        typeNum: 1,
        postId: subject.id,
        state: subject.status,
        address: subject.destination,
        school: subject.user.school.name
      }
      data.push(temp);
    }
    this.setData({
      PtList: data
    });
    wx.setStorage({
      key: 'PtList',
      data: data,
    })
  },

  getXy:function(){
    var url = app.globalData.baseUrl + '/xianyu?page=1&size=5';
    var that = this;
    var token = app.globalData.token;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        token: token
      },
      success: function (res) {
        console.log(res.data.data.data);
        that.setXy(res.data.data.data);
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  },

  getPt: function () {
    var url = app.globalData.baseUrl + '/paotui?page=1&size=5';
    var that = this;
    var token = app.globalData.token;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        token: token
      },
      success: function (res) {
        console.log(res.data.data.data);
        that.setData({
          hidden: true
        })
        that.setPt(res.data.data.data);
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  },
})