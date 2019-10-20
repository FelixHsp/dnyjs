// pages/bangding/bangding.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:'',
    pass:'',
    openId:'',
    flag:true,
    s_name:'',
    s_number:'',
    s_xueyuan:'',
    s_zhuanye:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this.setData({
          openId: res.result.openid
        })
      }
    })
    wx.getStorage({
      key: 'number',
      success:(res)=> {
        this.setData({
          flag:false
        })
        wx.request({
          url: 'https://www.felixlg.work/neauyjs/students/getstudent',
          data: {
            "number": res.data
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: "POST",
          success: (res) => {
            // console.log(res.data.data[0])
            this.setData({
              s_name:res.data.data[0].s_name,
              s_number: res.data.data[0].s_number,
              s_xueyuan: res.data.data[0].s_xueyuan,
              s_zhuanye: res.data.data[0].s_zhuanye
            })
          }
        })
      }
    })
  },
  xuehao(e){
    this.setData({
      number:e.detail.value
    })
  },
  mima(e){
    this.setData({
      pass: e.detail.value
    })
  },
  bangding:function(){
    if(this.data.openId==''){
      wx.showModal({
        title: '提示',
        content: '当前网络出现错误，请稍后再试',
        showCancel:false
      })
    }else if(!this.data.number || !this.data.pass){
      wx.showModal({
        title: '提示',
        content: '请将信息填写完整',
        showCancel:false
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '是否确定绑定',
        success:(res)=>{
          if(res.confirm){
            wx.request({
              url: 'https://www.felixlg.work/neauyjs/students/addopenid',
              data: {
                "number": this.data.number,
                "pass": this.data.pass,
                "openId": this.data.openId
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: "POST",
              success: (res) => {
                console.log(res.data)
                if(typeof(res.data)=='string'){
                  wx.showModal({
                    title: '提示',
                    content: '学号错误',
                    showCancel:false
                  })
                }else if(res.data.data == false){
                  wx.showModal({
                    title: '提示',
                    content: '密码错误',
                    showCancel: false
                  })
                } else if (res.data.data == true){
                  wx.request({
                    url: 'https://www.felixlg.work/neauyjs/students/getstudent',
                    data: {
                      "number": this.data.number
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: "POST",
                    success: (res) => {
                      console.log(res.data.data[0].s_openid)
                      if(res.data.data[0].s_openid == this.data.openId){
                        wx.showModal({
                          title: '提示',
                          content: '绑定成功',
                          showCancel: false,
                          success: (res) => {
                            if (res.confirm) {
                              wx.redirectTo({
                                url: '../bangding/bangding',
                              })
                            }
                          }
                        })
                        wx.setStorage({
                          key: 'number',
                          data: this.data.number
                        })
                      }else{
                        wx.showModal({
                          title: '提示',
                          content: '该学号已被其他人绑定，可以通过意见反馈联系我们',
                        })
                      }
                    }
                  })
                }
              }
            })
          }
        }
      })
    }
  },
  delbangding:function(){
    wx.showModal({
      title: '提示',
      content: '是否确定解除绑定',
      success:(res)=>{
        if(res.confirm){
          wx.request({
            url: 'https://www.felixlg.work/neauyjs/students/delopenid',
            data: {
              "number": this.data.s_number
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            success: (res) => {
              if(res.data.data == true){
                wx.removeStorage({
                  key: 'number',
                  success(res) {
                    wx.redirectTo({
                      url: '../bangding/bangding',
                    })
                  }
                })
              }
            }
          })
        }
      }
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