Page({
  data: {
    // 下拉菜单
    second: '类别',
    thirds: '审核状态',
    _num: 0,
    _res: 0,
    _id: 0,
    type: '',
    shenhe: '',
    s_number: '',
    form: []
  },
  isShow: true,
  currentTab: 0,
  onLoad: function (e) {
    wx.getStorage({
      key: 'number',
      success: (res) => {
        this.setData({
          s_number: res.data
        })
      }
    })
  },
  delTap: function (e) {
    console.log(e.target.dataset.id.x_id)
    wx.showModal({
      title: '提示',
      content: '点击确定，即可删除该记录',
      success:(res)=>{
        if(res.confirm){
          wx.request({
            url: 'https://www.felixlg.work/neauyjs/students/delxueshu',
            data: {
              "id": e.target.dataset.id.x_id
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            success: (res) => {
              wx.request({
                url: 'https://www.felixlg.work/neauyjs/students/getxueshu',
                data: {
                  "type": 'xueshulunwen',
                  "s_number": this.data.s_number,
                  "shenhe": this.data._res
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                method: "POST",
                success: (res) => {
                  this.setData({
                    form: res.data.data
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  // 下拉切换
  hideNav: function () {
    this.setData({
      displays: "none"
    })
  },
  // 区域
  tabNav: function (e) {
    this.setData({
      displays: "block"
    })
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {

      var showMode = e.target.dataset.current == 0;

      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  // 下拉切换中的切换
  // 区域
  selected: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected1: true
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
    })
  },
  // 下拉菜单1 2 3 4
  clickHouse: function (e) {
    this.setData({
      _res: e.target.dataset.num,
      shenhe: e.target.dataset.name,
      thirds: e.target.dataset.name,
    })
    this.setData({
      displays: "none"
    })
    // console.log(`审核状态:${this.data._res}`)
    wx.request({
      url: 'https://www.felixlg.work/neauyjs/students/getxueshu',
      data: {
        "type": 'xueshulunwen',
        "s_number": this.data.s_number,
        "shenhe": this.data._res
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: (res) => {
        this.setData({
          form: res.data.data
        })
        console.log(this.data.form)
      }
    })
  }
})