Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../images/bg1.jpg',
      '../../images/bg2.jpg',
      '../../images/bg3.jpg'
    ],
    indicatorDots: true, // 是否显示面板指示点
    autoplay: true,      // 是否自动切换
    circular: true,      // 是否采用衔接滑动
    interval: 5000,      // 自动切换时间间隔
    duration: 1000,      // 滑动动画时长,
    goFlag:false,
    s_number:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'number',
      success: (res) => {
        this.setData({
          goFlag: true,
          s_number:res.data
        })
        wx.cloud.callFunction({
          name: 'login',
          data: {},
          success: res => {
            this.setData({
              openId: res.result.openid
            })
            wx.request({
              url: 'https://www.felixlg.work/neauyjs/students/getstudent',
              data: {
                "number": this.data.s_number
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: "POST",
              success: (res) => {
                // console.log(res.data.data[0].s_openid == this.data.openId)
                if (res.data.data[0].s_openid != this.data.openId) {
                  wx.removeStorage({
                    key: 'number',
                    success:(res) => {
                      this.setData({
                        goFlag: false
                      })
                    }
                  })
                }
              }
            })
          }
        })
      },
      fail: () => {
        this.setData({
          goFlag: false
        })
      }
    })
  },
  goXueshu:function(){
    // console.log(1)
    if(this.data.goFlag){ 
      wx.navigateTo({
        url: '../xueshu/xueshu'
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '当前未绑定学生信息，请到我的-绑定信息页面，进行绑定',
        showCancel: false
      })
    }
  },
  gojingsai: function () {
    // console.log(1)
    if (this.data.goFlag) {
      wx.navigateTo({
        url: '../jingsai/jingsai'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前未绑定学生信息，请到我的-绑定信息页面，进行绑定',
        showCancel: false
      })
    }
  },
  goZhuzuo: function () {
    // console.log(1)
    if (this.data.goFlag) {
      wx.navigateTo({
        url: '../zhuzuo/zhuzuo'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前未绑定学生信息，请到我的-绑定信息页面，进行绑定',
        showCancel: false
      })
    }
  },
  goBiaozhang: function () {
    // console.log(1)
    if (this.data.goFlag) {
      wx.navigateTo({
        url: '../biaozhang/biaozhang'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前未绑定学生信息，请到我的-绑定信息页面，进行绑定',
        showCancel: false
      })
    }
  },
  goXiangmu: function () {
    // console.log(1)
    if (this.data.goFlag) {
      wx.navigateTo({
        url: '../xiangmu/xiangmu'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前未绑定学生信息，请到我的-绑定信息页面，进行绑定',
        showCancel: false
      })
    }
  },
  goKeyan: function () {
    // console.log(1)
    if (this.data.goFlag) {
      wx.navigateTo({
        url: '../keyan/keyan'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前未绑定学生信息，请到我的-绑定信息页面，进行绑定',
        showCancel: false
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
    wx.getStorage({
      key: 'number',
      success: (res) => {
        this.setData({
          goFlag: true,
          s_number: res.data
        })
        wx.cloud.callFunction({
          name: 'login',
          data: {},
          success: res => {
            this.setData({
              openId: res.result.openid
            })
            wx.request({
              url: 'https://www.felixlg.work/neauyjs/students/getstudent',
              data: {
                "number": this.data.s_number
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: "POST",
              success: (res) => {
                // console.log(res.data.data[0].s_openid == this.data.openId)
                if (res.data.data[0].s_openid != this.data.openId) {
                  wx.removeStorage({
                    key: 'number',
                    success: (res) => {
                      this.setData({
                        goFlag: false
                      })
                    }
                  })
                }
              }
            })
          }
        })
      },
      fail: () => {
        this.setData({
          goFlag: false
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