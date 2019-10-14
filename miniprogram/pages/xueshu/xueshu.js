// pages/xueshu/xueshu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['SCI', 'EI', 'CSCD','其他'],
    array2:['一区','二区','三区','四区'],
    index: 0,
    index2:0,
    date: '2019-09',
    todayDate:'',
    todayDateTime:'',
    todayTime:'',
    formItem:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'time',
      // 传给云函数的参数
      data: {

      },
    }).then(res => {
      // 计算时间
      var time = Date.parse(new Date(JSON.parse(res.result).sysTime2.replace(/-/g, '/'))) / 1000
      this.setData({
        todayTime: time,
        todayDate: JSON.parse(res.result).sysTime2.split(' ')[0],
        todayDateTime: JSON.parse(res.result).sysTime2
      })
      console.log(this.data.todayDate)
    })
  },
  bindPickerChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    console.log(e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
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