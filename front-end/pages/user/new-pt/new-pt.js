// pages/user/new-pt/new-pt.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    KeyboardInputContent: '',
    KeyboardInputAddress: '',
    KeyboardInputPrice: '',
    KeyboardInputDay: '',
    KeyboardInputHour: '',
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

  InputContent: function (e) {
    // console.log(e.detail.value);
    this.data.KeyboardInputContent = e.detail.value;
  },

  InputAddress: function (e) {
    // console.log(e.detail.value);
    this.data.KeyboardInputAddress = e.detail.value;
  },

  InputPrice: function (e) {
    // console.log(e.detail.value);
    this.data.KeyboardInputPrice = e.detail.value;
  },

  InputDay: function (e) {
    // console.log(e.detail.value);
    this.data.KeyboardInputDay = e.detail.value;
  },

  InputHour: function (e) {
    // console.log(e.detail.value);
    this.data.KeyboardInputHour = e.detail.value;
  },

  //显示modal窗口
  showModal: function (title, num, callback) {
    var token = app.globalData.token;
    var url = app.globalData.baseUrl + '/paotui/create?XDEBUG_SESSION_START=11262';
    var that = this;
    wx.showModal({
      title: title,
      confirmColor: '#1F4BA5',
      confirmText: '是',
      cancelText: '否',
      cancelColor: '#7F8389',
      success: function (res) {
        if (res.confirm) {
          // console.log(that.data.KeyboardInputContent);
          // console.log(that.data.KeyboardInputAddress);
          // console.log(that.data.KeyboardInputPrice);
          if (!that.data.KeyboardInputContent || !that.data.KeyboardInputAddress || !that.data.KeyboardInputPrice) {
            wx.showModal({
              confirmColor: '#1F4BA5',
              cancelColor: '#7F8389',
              title: '警告',
              content: '请填写完整后再提交',
            })
            return false;
          }
          var expire_time = 0;
          if (!that.data.KeyboardInputDay && !that.data.KeyboardInputHour)
            expire_time = 1 * 24 * 60;
          else if (!that.data.KeyboardInputDay && that.data.KeyboardInputHour)
            expire_time = that.data.KeyboardInputHour * 60;
          else if (that.data.KeyboardInputDay && !that.data.KeyboardInputHour)
            expire_time = that.data.KeyboardInputDay * 24 * 60;
          else
            expire_time = that.data.KeyboardInputHour * 60 + that.data.KeyboardInputDay * 24 * 60;
          if (expire_time < 10)
            expire_time = 20;
          console.log(expire_time);
          wx.request({
            url: url,
            method: 'POST',
            data: {
              describe: that.data.KeyboardInputContent,
              destination: that.data.KeyboardInputAddress,
              price: that.data.KeyboardInputPrice,
              expire_time: expire_time
            },
            header: {
              token: token
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
                  var data = '';
                  for(var i in res.data.msg){
                    data += res.data.msg[i] + ';  ';
                  }
                  // console.log(res.data.msg[data]);
                  wx.showModal({
                    confirmColor: '#1F4BA5',
                    cancelColor: '#7F8389',
                    title: '错误',
                    content: data,
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
              if (res.data.code == 201) {
                wx.showToast({
                  title: '已提交发布！',
                  duration: 3000
                });
              }
              callback && callback();
              setTimeout(function () {
                wx.redirectTo({
                  url: '../my-post/my-post',
                })
              }, 1000)
            },
            fail: function () {
              console.log(res.data);
              wx.showToast({
                title: '发布失败',
              })
            }
          });
        }
      }
    })
  },

  onSubTap: function () {
    this.showModal('是否确认提交', 0, function () {
      wx.showToast({
        title: "提交成功",
        duration: 1000,
        mask: true,
        icon: "success"
      });
    })
  },
})