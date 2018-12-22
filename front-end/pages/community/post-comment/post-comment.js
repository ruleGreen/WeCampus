// pages/post/post-comment/post-comment.js
var util = require('../../../util/util.js')
import { DBPost } from '../../../db/DBPost.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    useKeyboardFlag: true,
    keyboardInputValue: '',
    sendMoreMsgFlag: false,
    chooseFiles: [],    //保存已选择的图片
    deleteIndex: -1,
    currentAudio: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.dbPost = new DBPost(postId);
    var comments = this.dbPost.getCommentData();
    this.setData({
      comments: comments
    });
  },

  //预览图片
  previewImg: function (event) {
    var commentIdx = event.currentTarget.dataset.commentIdx;
    var imgIdx = event.currentTarget.dataset.imgIdx;
    var imgs = this.data.comments[commentIdx].content.img;
    wx.previewImage({
      current: imgs[imgIdx],
      urls: imgs,
    })
  },

  //切换输入方式
  switchInputType: function (event) {
    this.setData({
      useKeyboardFlag: !this.data.useKeyboardFlag
    })
  },

  //获取用户输入
  bindCommentInput: function (event) {
    var val = event.detail.value;
    // console.log(val);
    this.data.keyboardInputValue = val;
  },

  //提交用户评论
  submitComment: function (event) {
    var imgs = this.data.chooseFiles;
    var newData = {
      username: "青石",
      avatar: "/images/avatar/avatar-3.png",
      create_time: new Date().getTime() / 1000,
      content: {
        txt: this.data.keyboardInputValue,
        img: imgs
      },
    };
    console.log(newData.content.txt);
    if (!newData.content.txt && imgs.length == 0) {
      return;
    }
    this.dbPost.newComment(newData);  //保存新评论到缓存数据库中
    this.showCommitSuccessToast();   //显示操作结果
    this.bindCommentData();   //重新渲染并绑定所有评论
    this.resetAllDefaultStatus();   //恢复初始状态
  },

  submitVoiceComment: function (audio) {
    var newData = {
      username: "青石",
      avatar: "/images/avatar/avatar-3.png",
      create_time: new Date().getTime() / 1000,
      content: {
        txt: '',
        img: [],
        audio: audio
      },
    };
    //保存新评论到缓存数据库中
    this.dbPost.newComment(newData);
    //显示操作结果
    this.showCommitSuccessToast();
    //重新渲染并绑定所有评论
    this.bindCommentData();
  },

  playAudio: function (event) {
    var url = event.currentTarget.dataset.url,
      that = this;
    if (url == this.data.currentAudio) {
      wx.pauseVoice();
      this.data.currentAudio = ''
    }
    else {
      this.data.currentAudio = url;
      wx.playVoice({
        filePath: url,
        complete: function () {
          that.data.currentAudio = '';
        }
      })
    }
  },

  //评论成功
  showCommitSuccessToast: function () {
    //显示操作结果
    wx.showToast({
      title: "评论成功",
      duration: 1000,
      icon: "success"
    })
  },

  bindCommentData: function () {
    var comments = this.dbPost.getCommentData();
    this.setData({
      comments: comments
    })
  },

  //按钮，输入初始化
  resetAllDefaultStatus: function () {
    this.setData({
      keyboardInputValue: "",
      chooseFiles: [],
      sendMoreMsgFlag: false
    });
  },

  //显示选择照片，拍照等按钮
  sendMoreMsg: function () {
    this.setData({
      sendMoreMsgFlag: !this.data.sendMoreMsgFlag
    })
  },

  //选择本地照片与拍照
  chooseImage: function (event) {
    // 已选择图片数组
    var imgArr = this.data.chooseFiles;
    //只能上传3张照片，包括拍照
    var leftCount = 3 - imgArr.length;
    if (leftCount <= 0) {
      return;
    }
    var sourceType = [event.currentTarget.dataset.category],
      that = this;
    console.log(leftCount)
    wx.chooseImage({
      count: leftCount,
      sourceType: sourceType,
      success: function (res) {
        // 可以分次选择图片，但总数不能超过3张
        console.log(res)
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

  //开始录音
  recordStart: function () {
    var that = this;
    this.setData({
      recodingClass: 'recoding'
    });
    this.startTime = new Date();   //记录录音开始时间
    wx.startRecord({
      success: function (res) {
        var diff = (that.endTime - that.startTime) / 1000;   //计算时长
        diff = Math.ceil(diff);
        that.submitVoiceComment({ url: res.tempFilePath, timeLen: diff });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },

  //结束录音
  recordEnd: function () {
    this.setData({
      recodingClass: ''
    });
    this.endTime = new Date();
    wx.stopRecord();
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

  }
})