//index.js
//获取应用实例
const app = getApp()
var order = ['green', 'red', 'yellow', 'blue', 'green']
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    x: 0,
    y: 0,
    toView: "green",
    loading: false,
    color: '#000',
    background: '#fff',
    show: true,
    animated: false,
    list: [{
      text: "对话",
      iconPath: "/example/images/tabbar_icon_chat_default.png",
      selectedIconPath: "/example/images/tabbar_icon_chat_active.png",
      pagePath: "./index",
    },
    {
      text: "logs",
      iconPath: "/example/images/tabbar_icon_setting_default.png",
      selectedIconPath: "/example/images/tabbar_icon_setting_active.png",
      pagePath: "./logs/logs",
      badge: 'New'
    }]
  },
  tabChange(e) {
    console.log('tab change', e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  onLoad: function () {
    if (this.data.loading){
      wx.showNavigationBarLoading()
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // Change navigation bar title
  onShow: function () {
    wx.setNavigationBarTitle({
      title: 'Explore',
      success: function (res) {
        console.log(res)
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
