 // pages/home/home-detail/home-detail.js
import { DBPost } from '../../../db/DBPost.js';
var app = getApp();
var wxParse= require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.getDetailData(postId);
  },

  setDetailData:function(event){
    var that = this;
    var data = [];
    var data = {
      postImg: event.img.url,
      title: event.title,
    }
    this.setData({
      post: data
    })
    wxParse.wxParse('content', 'html', event.content, that, 5);
    // console.log(this.data.post);
  },

  getDetailData:function(id){
    var token = app.globalData.token;
    var postData = [];
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/information/' + id,
      method: 'GET',
      data: id,
      header: {
        token: token
      },
      success: function (res) {
        // console.log(res.data);
        that.setData({
          hidden: true
        })
        that.setDetailData(res.data);
      },
      fail: function (res) {
        console.log(res.data);
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
    return{
      title:this.data.title,
      desc:this.data.content,
      path:"pages/home/home-detail/home-detail"
    }
  }
})