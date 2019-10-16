// pages/xueshu/xueshu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['专利','软件著作权'],
    array2: ['发明申请', '实用新型', '外观设计'],
    index: 0,
    index2: 0,
    date: '2019-09',
    todayDate: '',
    todayDateTime: '',
    todayTime: '',
    formItem: {
      type:'专利',
      zhuanliType:'发明专利'
    },
    zhuanliisShow: true
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
        todayTime: JSON.parse(res.result).sysTime2,
      })
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index:e.detail.value,
      ['formItem.type']:this.data.array[e.detail.value]
    })
    if(e.detail.value == 1){
      this.setData({
        zhuanliisShow: false,
        ['formItem.zhuanliType']: '',
        ['formItem.publicInput']: ''
      })
    }
    if (e.detail.value == 0){
      this.setData({
        zhuanliisShow: true,
        ['formItem.applyInput']: ''
      })
    }
  },
  bindPickerChange2:function(e){
    this.setData({
      index2: e.detail.value,
      ['formItem.zhuanliType']:this.data.array2[e.detail.value]
    })
  },
  publicInput:function(e){
    this.setData({
      ['formItem.publicInput']:e.detail.value
    })
  },
  applyInput: function (e) {
    this.setData({
      ['formItem.applyInput']: e.detail.value
    })
  },
  addBtn: function () {
    if ((!this.data.formItem.publicInput && this.data.zhuanliisShow)||(!this.data.formItem.applyInput && !this.data.zhuanliisShow)) {
      wx.showModal({
        title: '提示',
        content: '请将信息填写完整',
        showCancel: false
      })
    } else {
      wx.showModal({
        title: '确认',
        content: '是否确定提交',
        success:(res)=>{
          if(res.confirm){
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
                ['formItem.infodate']: JSON.parse(res.result).sysTime2,
              })
              console.log(this.data.formItem)
            })
          }
        }
      })
    }
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