// pages/xueshu/xueshu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['SCI','SSCI','A&HCI','EI', 'CSCD','CSSCI','北大中文核心','其他'],
    array2:['一区','二区','三区','四区'],
    index: 0,
    index2:0,
    date: '2019-09',
    todayDate:'',
    todayDateTime:'',
    todayTime:'',
    formItem:{
      type:'SCI',
      jcr:'一区',
      date:'2019-09'
    },
    jcrisShow:true,
    cellShow:true,
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
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value,
      ['formItem.type']:this.data.array[e.detail.value]
    })
    if (this.data.index == 3 || this.data.index == 4 || this.data.index == 5 || this.data.index == 6 || this.data.index == 7){
      this.setData({
        jcrisShow:false,
        cellShow:false,
        ['formItem.jcr']:'',
        ['formItem.cell']: ''
      })
    }else if(this.data.index == 2){
      this.setData({
        jcrisShow: false,
        cellShow: true,
        ['formItem.jcr']: ''
      })
    }else{
      this.setData({
        jcrisShow:true,
        cellShow:true
      })
    }
  },
  titleInput:function(e){
    this.setData({
      ['formItem.title']:e.detail.value
    })
  },
  nameInput: function (e) {
    this.setData({
      ['formItem.name']: e.detail.value
    })
  },
  cellInput: function (e) {
    this.setData({
      ['formItem.cell']: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    console.log(e.detail.value)
    this.setData({
      index2: e.detail.value,
      ['formItem.jcr']: this.data.array2[e.detail.value]
    })
  },
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value,
      ['formItem.date']: e.detail.value
    })
  },
  addBtn:function(){
    if(!this.data.formItem.title || !this.data.formItem.name || (!this.data.formItem.cell && this.data.cellShow)){
      wx.showModal({
        title: '提示',
        content: '请将信息填写完整',
        showCancel:false
      })
    }else{
      wx.showModal({
        title: '确认',
        content: '是否确定提交',
        success:(res)=>{
          if(res.confirm){
            wx.getStorage({
              key: 'number',
              success: (res) => {
                this.setData({
                  ['formItem.s_number']:res.data
                })
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