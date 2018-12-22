var app = getApp();
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    score1: 0,
    score2: 0,
    score3: 0,
    mold1: '',
    mold2: '',
    mold3: '',
    id: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.setData({
      id: postId
    })
  },

  onTapScore1:function(event){
    var score = event.currentTarget.dataset.id;
    var mold = '';
    if(score == 1) mold = '非常差';
    else if(score == 2) mold = '较差';
    else if(score == 3) mold = '一般';
    else if(score == 4) mold = '较好';
    else if(score == 5) mold = '非常好';
    this.setData({
      score1: score,
      mold1: mold
    })
  },

  onTapScore2: function (event) {
    var score = event.currentTarget.dataset.id;
    var mold = '';
    if (score == 1) mold = '非常差';
    else if (score == 2) mold = '较差';
    else if (score == 3) mold = '一般';
    else if (score == 4) mold = '较好';
    else if (score == 5) mold = '非常好';
    this.setData({
      score2: score,
      mold2: mold
    })
  },

  onTapScore3: function (event) {
    var score = event.currentTarget.dataset.id;
    var mold = '';
    if (score == 1) mold = '非常差';
    else if (score == 2) mold = '较差';
    else if (score == 3) mold = '一般';
    else if (score == 4) mold = '较好';
    else if (score == 5) mold = '非常好';
    this.setData({
      score3: score,
      mold3: mold
    })
  },

  onInputTap:function(event){
    var score = this.data.score1 * 0.3 + this.data.score2 * 0.3 + this.data.score3 * 0.4;
    console.log(score);
    // console.log(this.data.id);
    var url = app.globalData.baseUrl + "/paotui/judge";
    var token = app.globalData.token;
    wx.request({
      url: url,
      method: 'POST',
      header: {
        token: token
      },
      data:{
        id: this.data.id,
        grade: score
      },
      success: function (res) {
        // console.log(res.data);
        if (res.data.code == 201) {
          wx.showToast({
            title: '评价成功！',
            duration: 3000
          });
        }
      },
      fail: function (res) {
        console.log(res.data);
        wx.showToast({
          title: '评价失败',
        })
      }
    }),
    setTimeout(function () {
      wx.redirectTo({
        url: '../../user/my-accept/my-accept',
      })
    }, 1000)
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