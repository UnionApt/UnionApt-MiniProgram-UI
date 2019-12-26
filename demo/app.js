//app.js
App({

  /**
   * 全局变量
   */
  globalData: {
    URL: 'http://39.106.187.76:8000/',
    KEY: ''
  },

  onLaunch: function() {
    var myThis = this
    wx.request({
      url: this.globalData.URL + 'getUnionKey',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        myThis.globalData.KEY = res.data
      }
    })
  },
})