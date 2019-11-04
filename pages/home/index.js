// pages/home/index.js
const app = getApp()
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    id: ''
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  clickImg: function() {
    var _this = this;
    var c = util;
    wx.scanCode({
      onlyFromCamera: true,
      scanType: 'qrCode',
      success(res) {
        console.log(res)
        let data = res.result;
        var start = data.indexOf("?"); //获得字符串的开始位置
        var result = data.substring(start, data.length + 1); //截取字符串
        result = result.toLocaleLowerCase();
        let id = util.getUrlParam("id", result);
        if (id == null) {
          wx.showToast({
            title: "无法解析二维码",
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.request({
            url: app.globalData.apiUlr + 'Api/getCarInfobyID',
            method: 'post',
            data: {
              ID: id
            },
            header: {
              'content-type': 'application/json; charset=utf-8 ',
              'accept': 'application/json'
            },
            success(res) {
              if (res.data.code != 1) {
                wx.showToast({
                  title: "服务器请求异常",
                  icon: 'none',
                  duration: 2000
                })
              } else {
                if (res.data.data.info == null) {
                  wx.showModal({
                    title: '提示',
                    content: '获取车辆信息失败，请检查车牌号是否正确',
                    success(res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                } else {
                  let data = JSON.stringify(res.data.data);
                  wx.navigateTo({
                    url: '../index/index?data=' + data,
                  })
                }
              }
              console.info(res);
            }
          })
        }
        console.info(id);
      }
    })
  },

  clickSelect: function() {
    console.info(this.data.inputValue);
    wx.request({
      url: app.globalData.apiUlr + 'Api/getCarInfobyLN',
      method: 'post',
      data: {
        Str: this.data.inputValue
      },
      header: {
        'content-type': 'application/json; charset=utf-8 ',
        'accept': 'application/json'
      },
      success(res) {
        if (res.data.code != 1) {
          wx.showToast({
            title: "服务器请求异常",
            icon: 'none',
            duration: 2000
          })
        } else {
          if (res.data.data.info == null) {
            wx.showModal({
              title: '提示',
              content: '获取车辆信息失败，请检查号牌是否正确',
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            let data = JSON.stringify(res.data.data);
            wx.navigateTo({
              url: '../index/index?data=' + data,
            })
          }
        }
        console.info(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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