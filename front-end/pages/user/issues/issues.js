//issues.js
//获取应用实例
var app = getApp();
Page({
  onLoad: function () {
    
  },

  submit:function(){
    wx.showToast({
      title: '提交成功',
      duration:1000,
      icon: 'success'
    })
  }
});