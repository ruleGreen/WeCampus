var app = getApp()
Page({
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    hidden: false
  },
  onLoad: function () {
    this.getLessons();
  },

  getLessons: function () {
    var url = app.globalData.baseUrl + '/timetable';
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
        if(flag == 1){
          if(res.data.error_code == 20001){
            wx.showModal({
              confirmColor: '#1F4BA5',
              cancelColor: '#7F8389',
              title: '错误',
              content: "您的登陆信息有误请重新绑定信息",
              success: function (res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '../../frontpage/frontpage',
                  })
                } else if (res.cancel) {
                  wx.redirectTo({
                    url: '../../frontpage/frontpage',
                  })
                }
              }
            })
          }
        }
        that.setData({
          hidden: true
        })
        var lessons = [];
        var wlist = [];
        lessons = res.data;
        for (var i = 0; i < lessons.length; i++) {
          var temp = {
            "xqj": lessons[i].coordinate.weekday,
            "skjc": lessons[i].coordinate.duration[0],
            "skcd": lessons[i].coordinate.duration[1],
            "kcmc": lessons[i].class_msg
          }
          wlist.push(temp);
        }
        // console.log(wlist);
        that.setData({
          wlist: wlist
        })
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  }
})