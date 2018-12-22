// pages/user/new-xy/new-xy.js
import { DBPost } from '../../../db/DBPost.js'
var app = getApp();
var adds = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseFiles: [],    //保存已选择的图片
    deleteIndex: -1,
    KeyboardInputTitle: '',
    KeyboardInputContent: '',
    KeyboardInputDetail: '',
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
  //选择本地照片与拍照
  chooseImage: function (event) {
    // 已选择图片数组
    var imgArr = this.data.chooseFiles;
    //只能上传1张照片，包括拍照
    var leftCount = 1 - imgArr.length;
    if (leftCount <= 0) {
      return;
    }
    var sourceType = [event.currentTarget.dataset.category],
      that = this;
    // console.log(leftCount)
    wx.chooseImage({
      count: leftCount,
      sourceType: sourceType,
      success: function (res) {
        // 可以分次选择图片，但总数不能超过3张
        // console.log(res)
        that.setData({
          chooseFiles: imgArr.concat(res.tempFilePaths)
        });
      }
    })
  },

  //删除已经选择的图片
  deleteImage: function (event) {
    var index = event.currentTarget.dataset.idx;
    var that = this;
    that.setData({
      deleteIndex: index
    });
    that.data.chooseFiles.splice(index, 1);
    setTimeout(function () {
      that.setData({
        deleteIndex: -1,
        chooseFiles: that.data.chooseFiles
      });
    }, 500)
  },

  InputTitle: function (e) {
    // console.log(e.detail.value);
    this.data.KeyboardInputTitle = e.detail.value;
  },

  InputContent: function (e) {
    // console.log(e.detail.value);
    this.data.KeyboardInputContent = e.detail.value;
  },

  InputDetail: function (e) {
    // console.log(e.detail.value);
    this.data.KeyboardInputDetail = e.detail.value;
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
    var that = this;
    var token = app.globalData.token;
    var url = app.globalData.baseUrl + '/xianyu/create';
    adds.title = that.data.KeyboardInputTitle;
    adds.summary = that.data.KeyboardInputContent;
    adds.detail = that.data.KeyboardInputDetail;
    adds.price = that.data.KeyboardInputPrice;
    if (!that.data.KeyboardInputDay && !that.data.KeyboardInputHour)
      adds.expire_time = 10 * 24 * 60;
    else if (!that.data.KeyboardInputDay && that.data.KeyboardInputHour)
      adds.expire_time = that.data.KeyboardInputHour * 60;
    else if (that.data.KeyboardInputDay && !that.data.KeyboardInputHour)
      adds.expire_time = that.data.KeyboardInputDay * 24 * 60;
    else
      adds.expire_time = that.data.KeyboardInputHour * 60 + that.data.KeyboardInputDay * 24 * 60;
    console.log(adds.expire_time);
    if (adds.expire_time < 10)
      adds.expire_time = 60;
    console.log(adds.expire_time);
    wx.showModal({
      title: title,
      confirmColor: '#1F4BA5',
      confirmText: '是',
      cancelText: '否',
      cancelColor: '#7F8389',
      success: function (res) {
        if(res.confirm){
          // console.log(that.data.KeyboardInputTitle);
          // console.log(that.data.KeyboardInputContent);
          // console.log(that.data.KeyboardInputDetail);
          // console.log(that.data.KeyboardInputPrice);
          // console.log(that.data.chooseFiles);
          if (!that.data.KeyboardInputTitle || !that.data.KeyboardInputContent || !that.data.KeyboardInputDetail || !that.data.KeyboardInputPrice || that.data.chooseFiles.length==0){
            wx.showModal({
              confirmColor: '#1F4BA5',
              cancelColor: '#7F8389',
              title: '警告',
              content: '请填写完整后再提交(包括图片)',
            })
            return false;
          }
          wx.uploadFile({
            url: url,
            filePath: that.data.chooseFiles[0],
            name: 'img',
            header: {
              token: token
            },
            formData: adds,
            success: function (res) {
              var flag = 0;
              var msg = JSON.parse(res.data);
              for (var i in msg) {
                if (i == "error_code")
                  flag = 1;
              };
              if (flag == 1) {
                if(msg.error_code == 10000){
                  var data = '';
                  for (var i in msg.msg) {
                    data += msg.msg[i] + ';  ';
                  }
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
                    content: msg.msg,
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
            fail: function (res) {
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