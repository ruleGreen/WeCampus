// pages/community/pt-detail/pt-detail.js
import { DBPost } from '../../../db/DBPost.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    post: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    var posttype = options.type;
    var postData = [];
    var that = this;
    if(posttype == 1){
      wx.getStorage({
        key: 'PtList',
        success: function (res) {
          var data = res.data;
          var len = data.length;
          for (var i = 0; i < len; i++) {
            if (data[i].postId == postId) {
              postData = data[i];
            }
          }
          that.setData({
            post: postData,
            id: postId
          });
        },
      });
    }
    else if(posttype == 3){
      wx.getStorage({
        key: 'MyPtList',
        success: function (res) {
          var data = res.data;
          var len = data.length;
          for (var i = 0; i < len; i++) {
            if (data[i].postId == postId) {
              postData = data[i];
            }
          }
          that.setData({
            post: postData,
            id: postId
          });
        },
      });
    }
    else if (posttype == 4) {
      wx.getStorage({
        key: 'PtAcceptList',
        success: function (res) {
          var data = res.data;
          var len = data.length;
          for (var i = 0; i < len; i++) {
            if (data[i].postId == postId) {
              postData = data[i];
            }
          }
          that.setData({
            post: postData,
            id: postId
          });
        },
      });
    }
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
      title:this.data.post.destination,
      desc:this.data.post.describe,
      path:"pages/community/pt-detail/pt-detail"
    }
  },

  // onCommentTap: function (event) {
  //   var id = event.currentTarget.dataset.postId;
  //   wx.navigateTo({
  //     url: '../post-comment/post-comment?id=' + id
  //   })
  // },

  onCancelTap:function(event){
    var that = this;
    var token = app.globalData.token;
    var state = 0;
    var url = app.globalData.baseUrl + "/paotui/delete/" + that.data.id;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        token: token
      },
      success: function (res) {
        state = 0
        that.setData({
          'post.state': state
        })
        wx.showToast({
          title: "订单删除成功",
          duration: 1000,
          icon: "success",
          mask: true
        })
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
    setTimeout(function () {
      wx.redirectTo({
        url: '../../user/my-post/my-post',
      })
    }, 1000)
  },

  onAcceptTap:function(event){
    var that = this;
    var token = app.globalData.token;
    var state = 0;
    // console.log(that.data.post.state);
    // console.log(that.data.id);
    // console.log(state);
    if(that.data.post.state == 1){
      var url = app.globalData.baseUrl + "/paotui/" + that.data.id;
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
          state = 2
          that.setData({
            'post.state': state
          })
          wx.showToast({
            title: state == 2 ? "抢单成功" : "取消成功",
            duration: 1000,
            icon: "success",
            mask: true
          })
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          // console.log(pages);
          prevPage.onLoad();
        },
        fail: function (res) {
          console.log(res.data);
        }
      })
    }
    else{
      var url = app.globalData.baseUrl + "/paotui/cancel/" + that.data.id;
      wx.request({
        url: url,
        method: 'GET',
        header: {
          token: token
        },
        success: function (res) {
          state = 1
          that.setData({
            'post.state': state
          })
          wx.showToast({
            title: state == 2 ? "抢单成功" : "取消成功",
            duration: 1000,
            icon: "success",
            mask: true
          })
        },
        fail: function (res) {
          console.log(res.data);
        }
      })
    }
  },

  onFinishTap:function(event){
    var that = this;
    var token = app.globalData.token;
    var state = 0;
    var url = app.globalData.baseUrl + "/paotui/finish/" + that.data.id;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        token: token
      },
      success: function (res) {
        state = 3;
        that.setData({
          'post.state': state
        })
        that.ranked(0);
        wx.showToast({
          title: "订单完成",
          duration: 1000,
          icon: "success",
          mask: true
        })
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  },

  onRankTap: function(){
    var that = this;
    var id = that.data.id
    console.log(that.data.post);
    wx.redirectTo({
      url: '../rank/rank?id=' + id,
    })
  }

})