// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:'未绑定'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'number',
      success: (res) => {
        this.setData({
          number: res.data
        })
      }
    })
  },
  goBangding:function(){
    // console.log(1)
    wx.navigateTo({
      url: '../bangding/bangding',
    })
  },
  goXueshu:function(){
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  goZhishi: function () {
    wx.navigateTo({
      url: '../detail1/detail1',
    })
  },
  goZhuzuo: function () {
    wx.navigateTo({
      url: '../detail2/detail2',
    })
  },
  goBiaozhang: function () {
    wx.navigateTo({
      url: '../detail3/detail3',
    })
  },
  goKeyan: function () {
    wx.navigateTo({
      url: '../detail4/detail4',
    })
  },
  goChengguo: function () {
    wx.navigateTo({
      url: '../detail5/detail5',
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
    wx.getStorage({
      key: 'number',
      success: (res) => {
        this.setData({
          number: res.data
        })
      }
    })
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