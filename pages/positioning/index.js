// pages/positioning/index.js
//获取应用实例
const app = getApp()
var bmap = require('../../lib/bmap-wx.js');
var wxMarkerData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    licenseNumber:'',
    localtime:'',
    speed:'',
    azimuth:''
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
  },
  showSearchInfo: function (data, i) {
    var that = this;
    
  },

  getData:function(data){
    var _this=this;
    wx.request({
      url: app.globalData.apiUlr+'Api/getCarLocal',
      method: 'post',
      data: {
        str: data
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
        }
        else {
          if (res.data.data == null) {
            wx.showToast({
              title: "获取车辆定位信息失败",
              icon: 'none',
              duration: 2000
            })
          }
          else {
            _this.setData({
              localtime:res.data.data.LOCALTIME,
              speed: res.data.data.speed,
              longitude: res.data.data.lng,
              latitude: res.data.data.lat
            });
            var BMap = new bmap.BMapWX({
              ak: app.globalData.mapApk
            }); 
            var fail = function (data) {
              console.log(data)
              wx.showToast({
                title: "请检查位置服务是否开启",
                icon: 'none',
                duration: 2000
              })
            };
            var success = function (data) {
              wxMarkerData = data.wxMarkerData;
             
              _this.setData({
                markers: [{
                  iconPath: '../../image/car.png',
                  id: 0,
                  latitude: wxMarkerData[0].latitude,
                  longitude: wxMarkerData[0].longitude,
                  width: 30,
                  height: 30,
                  callout: {
                    content: _this.data.licenseNumber,
                    color: "#000000",
                    fontSize: 13,
                    borderRadius: 2,
                    bgColor: "#fff",
                    display: "ALWAYS",
                    boxShadow: "5px 5px 10px #aaa"
                  }
                }]
              });
              // _this.setData({
              //   latitude: res.data.data.lat
              // });
              // _this.setData({
              //   longitude: res.data.data.lng
              // }); 
              console.info(_this.data.markers);
            }
            // 发起regeocoding检索请求 
            BMap.regeocoding({
              location: res.data.data.lat + ',' + res.data.data.lng,
              fail: fail,
              success: success,
              // iconPath: '../../image/car.png',
              // iconTapPath: '../../image/car.png'
            }); 
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let item = JSON.parse(options.data);
    this.setData({
      licenseNumber:item
    });
    this.getData(item);
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