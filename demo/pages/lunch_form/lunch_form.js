// pages/lunch_form/lunch_form.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    communityArray: [{
      "text": "3480 San Marino St"
    }, {
      "text": "3482 San Marino St"
    }],
    community: '',
    type: ''
  },

  setCommunity(e) {
    this.data.community = e.detail
  },

  formSubmit: function(e) {
    console.log('订餐信息提交，信息1为：', e.detail.value)
    console.log('订餐信息提交，信息2为：', this.data.community)
    console.log('订餐类别：' + this.data.type)
    let {
      _name,
      _roomId,
      _email,
      _key
    } = e.detail.value;
    if (!_name || !_roomId || !_email || !_key || !this.data.community) {
      wx.showToast({
        title: '请填写全部标有*的信息',
        icon: 'none',
        duration: 2000
      })
    } else {
      if (_key != app.globalData.KEY) {
        wx.showToast({
          title: '请输入正确的产品密钥',
          icon: 'none',
          duration: 2000
        })
        return
      }
      wx.request({
        url: app.globalData.URL + 'service/foodorder/submit',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          name: _name,
          email: _email,
          room: _roomId,
          community: this.data.community,
          meal_type: this.data.type,
        },
        success: function(res) {
          console.log(res) // 服务器回包信息
          wx.showModal({
            title: '订餐成功',
            content: '确认邮件已发送至您的邮箱',
            showCancel: false,
            confirmText: '返回首页',
            success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 2
                })
              }
            }
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.type = options.type
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})