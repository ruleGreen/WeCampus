// pages/home/home.js
import { DBPost } from '../../db/DBPost.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['新 闻', '活 动','资 料'],
    currentTab: 0,
    hidden: false
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var dbPost = new DBPost();
    // this.setData({
    //   postList: dbPost.getAllPostData()
    // });
    this.getSwiperData();
    this.getHomePageData();
    // this.setData();
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

  getBannerData: function(event){
    var data = [];
    for(var idx in event){
      var subject = event[idx];
      var temp={
        postImg: subject.img.url,
        postId: subject.inform_id
      }
      data.push(temp);
    }
    this.setData({
      BannerList:data
    })
    // console.log(this.data.BannerList);
  },

  getNewsData: function (event) {
    var data = [];
    for (var idx in event) {
      var subject = event[idx];
      var temp = {
        posttype: subject.type,
        postId: subject.id,
        postImg: subject.img.url,
        title: subject.title,
        date: subject.publish_time
      }
      data.push(temp);
    }
    this.setData({
      NewsList: data
    })
    // console.log(this.data.NewsList);
  },

  //获取轮播数据
  getSwiperData:function(){
    var url = app.globalData.baseUrl + '/banner/1';
    var token = app.globalData.token;
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        token: token
      },
      success: function (res) {
        // console.log(res.data);
        that.getBannerData(res.data.items);
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  },

  //获取新闻数据
  getHomePageData:function(){
    var url = app.globalData.baseUrl + '/information?page=1&size=15';
    var token = app.globalData.token;
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        token: token
      },
      success: function (res) {
        var flag = 0;
        // console.log(res.data);
        for (var i in res.data) {
          if (i == "error_code")
            flag = 1;
        };
        if (flag == 1) {
          wx.showModal({
            confirmColor: '#1F4BA5',
            cancelColor: '#7F8389',
            title: '错误',
            content: res.data.msg,
          })
          return false;
        }
        that.setData({
          hidden:true
        })
        // console.log(res.data);
        that.getNewsData(res.data.data)
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  },

  //跳转到新闻详情
  onTapToDetail:function(event){
    var postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: 'home-detail/home-detail?id=' + postId,
    })
  }

})