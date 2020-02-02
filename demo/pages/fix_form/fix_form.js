// pages/fix_form/fix_form.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    communityArray: [{
      "text": "A"
    }, {
      "text": "B"
    }, {
      "text": "C"
    }],
    community: '',
  },

  setCommunity(e) {
    this.data.community = e.detail
  },

  formSubmit: function(e) {
    console.log('维修信息提交，信息1为：', e.detail.value)
    console.log('维修信息提交，信息2为：', this.data.community)
    let {
      _name,
      _roomId,
      _email,
      _key,
      _remark,
    } = e.detail.value;
    if (!_name || !_roomId || !_email || !_key || !_remark || !this.data.community) {
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
        url: app.globalData.URL + 'service/maintenanceorder/submit',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          name: _name,
          email: _email,
          room: _roomId,
          description: _remark,
          community: this.data.community,
        },
        success: function(res) {
          console.log(res) // 服务器回包信息
          wx.showModal({
            title: '预约成功',
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

  getCommunity: function () {
    var myThis = this
    wx.request({
      url: app.globalData.URL + 'getRegionList',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res) // 服务器回包信息
        myThis.setData({
          communityArray: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCommunity()
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