// pages/community/xy-detail/xy-detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post:[],
    id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    var posttype = options.type;
    var postData = [];
    var that = this;
    if(posttype == 0){
      wx.getStorage({
        key: 'XyList',
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
    else if (posttype == 2){
      wx.getStorage({
        key: 'MyXyList',
        success: function (res) {
          var data = res.data;
          var len = data.length;
          // console.log(data[0].postId);
          // console.log(data[0]);
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
      title:this.data.post.title,
      desc:this.data.post.detail,
      path:"pages/community/xy-detail/xy-detail"
    }
  },

  onCommentTap:function(event){
    var postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '../post-comment/post-comment?id=' + postId,
    })
  },

  onCancelTap: function (event) {
    var that = this;
    var url = app.globalData.baseUrl + "/xianyu/cancel/" + that.data.id;
    // console.log(that.data.id);
    var token = app.globalData.token;
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
        wx.showToast({
          title: "发布取消成功",
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
})