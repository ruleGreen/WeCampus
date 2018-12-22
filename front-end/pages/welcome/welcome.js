// pages/welcome/welcome.js
// import { DBPost } from '../../db/DBPost.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserList:[],
    casArray: ['中国传媒大学','北京大学'],
    casIndex: 0,
    existence: 0,
    keyboardInputID: '',
    keyboardInputPW: '',
    hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var dbPost = new DBPost();
    this.setData({
      userInfo: app.globalData.g_userInfo,
      // postList: dbPost.getAllPostData(),
      existence: app.globalData.existence
    });
    // console.log(app.globalData.existence);
    // this.getUserData();
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
    this.onLoad();
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
  
  //获取用户信息
  getUserData: function () {
    var postsData = this.data.postList;
    var len = postsData.length;
    var UserList = [];
    for (var i = 0; i < len; i++) {
      //console.log(postsData[i])
      if (postsData[i].typeNum == 5) {
        UserList.push(postsData[i])
      }
    }
    this.setData({
      UserList: UserList
    })
    // console.log(this.data.UserList[0])
  },

  onTapJump: function (event) {
    var _this = this;
    var token = app.globalData.token;
    // console.log(token);
    // 如果用户不存在则需要绑定
    _this.setData({
      hidden:false
    })
    if (!_this.data.existence) {
      app.globalData.rank = 5;
      if (!_this.data.keyboardInputID || !_this.data.keyboardInputPW) {
        wx.showModal({
          confirmColor: '#1F4BA5',
          cancelColor: '#7F8389',
          title: '警告',
          content: '学号及密码不能为空',
        })
        _this.setData({
          hidden: true
        })
        return false;
      }
      wx.request({
        url: app.globalData.baseUrl + '/login',
        data: {
          school: _this.data.casIndex + 1,
          userid: _this.data.keyboardInputID,
          password: _this.data.keyboardInputPW,
          nickname: app.globalData.g_userInfo.nickName,
          avatar: app.globalData.g_userInfo.avatarUrl
        },
        header: {
          token: token
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success: function (res) {
          var flag = 0;
          for(var i in res.data){
            if(i == "error_code")
              flag = 1;
          };
          if (flag == 1){
            wx.showModal({
              confirmColor: '#1F4BA5',
              cancelColor: '#7F8389',
              title: '错误',
              content: res.data.msg,
            })
            _this.setData({
              hidden: true
            })
            return false;
          }
          else{
            _this.setData({
              hidden:true
            })
            app.globalData.token = res.data.token;
            wx.switchTab({
              url: '../home/home',
              success: function () {
                console.log("jump success")
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              },
              fail: function () {
                console.log("jump failed")
              },
              complete: function () {
                console.log("jump complete")
              }
            })
          }
        },
        fail: function (res) {
          console.log(res.data);

        }     
      })
    }
    else {
      wx.request({
        url: app.globalData.baseUrl + '/user',
        header: {
          token: token
        },
        method: 'GET',
        success:function(res) {
          // console.log(res.data);
          app.globalData.rank = res.data.judge;
          wx.switchTab({
            url: '../home/home',
            success: function () {
              console.log("jump success")
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            },
            fail: function () {
              console.log("jump failed")
            },
            complete: function () {
              console.log("jump complete")
            }
          })
        },
        fail: function (res) {
          console.log(res.data);
        }  
      })
    }

    
  },

  bindCasPickerChange: function (e) {
    var input = e.detail.value;
    this.setData({
      casIndex: e.detail.value
    })
  },

  bindInputID:function(e){
    this.data.keyboardInputID = e.detail.value;
  },

  bindInputPW:function(e){
    this.data.keyboardInputPW = e.detail.value;
  }
})