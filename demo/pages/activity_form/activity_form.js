// pages/activity_form/activity_form.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    universityArray: [{
      "text": "USC"
    }, {
      "text": "UCLA"
    }],
    communityArray: [{
      "text": "A"
    }, {
      "text": "B"
    }, {
      "text": "C"
    }],
    community: '',
    university: ''
  },

  setCommunity(e) {
    this.data.community = e.detail
  },

  setUniversity(e) {
    this.data.university = e.detail
  },

  formSubmit: function(e) {
    console.log('活动信息提交，信息1为：', e.detail.value)
    console.log('活动信息提交，信息2为：', this.data.community + ' ' + this.data.university)
    let {
      _name,
      _gender,
      _age,
      _email,
      _identity,
      _channel
    } = e.detail.value;
    if (!_name || !_gender || !_age || !_email || _identity.length == 0) {
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
      wx.showToast({
        title: '请填写全部标有*的信息',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: app.globalData.URL + 'applicant/register',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          name: _name,
          gender: _gender,
          age: _age,
          email: _email,
          identity: _identity,
          school: this.data.university,
          community: this.data.community,
          heardFrom: _channel,
          eventId: this.data.id
        },
        success: function(res) {
          console.log(res) // 服务器回包信息
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
    this.data.id = options._id
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