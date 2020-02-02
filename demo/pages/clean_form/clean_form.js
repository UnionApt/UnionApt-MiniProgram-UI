// pages/clean_form/clean_form.js
const app = getApp()
var date = new Date()
var currentHours = date.getHours()

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
    startDate: "请选择日期",
    multiArray: [
      ['明天', '后天', '3-2', '3-3', '3-4', '3-5'],
      [0, 1, 2, 3, 4, 5, 6],
    ],
    multiIndex: [0, 0],
  },

  setCommunity(e) {
    this.data.community = e.detail
  },

  formSubmit: function(e) {
    console.log('清洁信息提交，信息1为：', e.detail.value)
    console.log('清洁信息提交，信息2为：', this.data.community)
    let {
      _name,
      _roomId,
      _email,
      _key,
      _remark,
    } = e.detail.value;
    if (!_name || !_roomId || !_email || !_key || !_remark || !this.data.community || this.data.startDate == '请选择日期') {
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
        url: app.globalData.URL + 'service/cleaningorder/submit',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          name: _name,
          email: _email,
          room: _roomId,
          requirement: _remark,
          community: this.data.community,
          time: this.data.startDate,
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
                  delta: 3
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

  },

  pickerTap: function() {
    date = new Date();

    var monthDay = ['明天', '后天'];
    var hours = [];
    var interval = 3;

    // 月-日
    for (var i = interval; i <= 10; i++) {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + i);
      var md = (date1.getMonth() + 1) + "-" + date1.getDate();
      monthDay.push(md);
    }

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    this.loadHours(hours);

    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;

    this.setData(data);
  },

  bindMultiPickerColumnChange: function(e) {
    date = new Date();

    var that = this;

    var monthDay = ['明天', '后天'];
    var hours = [];

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;

    // 然后再判断当前改变的是哪一列
    if (e.detail.column === 0) { //如果是第1列改变
      that.loadHours(hours);
      data.multiIndex[1] = 0;
    } else if (e.detail.column === 1) { //如果是第2列改变
      that.loadHours(hours);
    }

    data.multiArray[1] = hours;
    this.setData(data);
  },

  loadHours: function(hours) {
    for (var i = 10; i < 18; i++) {
      hours.push(i);
    }
  },

  bindStartMultiPickerChange: function(e) {
    var that = this;
    var monthDay = that.data.multiArray[0][e.detail.value[0]];
    var hours = that.data.multiArray[1][e.detail.value[1]];

    if (monthDay === "明天") {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + 1);
      monthDay = (date1.getMonth() + 1) + "月" + date1.getDate() + "日";
    } else if (monthDay === "后天") {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + 2);
      monthDay = (date1.getMonth() + 1) + "月" + date1.getDate() + "日";
    } else {
      var month = monthDay.split("-")[0];
      var day = monthDay.split("-")[1];
      monthDay = month + "月" + day + "日";
    }
    var startDate = monthDay + " " + hours + ":00"
    that.setData({
      startDate: startDate
    })
  }
})