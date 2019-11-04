// pages/playback/index.js
var util = require("../../utils/util.js")
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    licenseNumber: '',
    timer: null,
    playIndex:0,
    latitude: 30.663517706899615,
    longitude: 104.10199364418031,
    markers: [{
      iconPath: '../../image/start.png',
      id: 0,
      latitude: 30.66102592579457,
      longitude: 104.10261591667177,
      width: 30,
      height: 30,
      title: "川A2342",
      // callout: {
      //   content: "川A2342" + ' \n 时间：' + 2 + ' \n 速度：' + 3 + ' km/h',
      //   color: "#000000",
      //   fontSize: 13,
      //   borderRadius: 2,
      //   bgColor: "#fff",
      //   display: "ALWAYS",
      //   boxShadow: "5px 5px 10px #aaa"
      // }
    },
      {
        iconPath: '../../image/end.png',
        id: 0,
        latitude: 30.663517706899615,
        longitude: 104.10199364418031,
        width: 30,
        height: 30,
      }],
    polyline: [{
      points: [
        { longitude: 104.10261591667177, latitude: 30.66102592579457 },
        { longitude: 104.10284122222902, latitude: 30.662013417103026 },
        { longitude: 104.10199364418031, latitude: 30.663517706899615 }
        ],//路径坐标点
      color: "#FF0000DD",
      width: 4,
      dottedLine: false,
      arrowLine:true,
      arrowIconPath:"../../image/end.png",
    }],
  
    startdate: util.formatDate(new Date()),
    enddate: util.formatDate(new Date()),
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startdate: e.detail.value
    })
  },
  bindEndDateChange:function(e)
  {
    this.setData({
      enddate: e.detail.value
    })
  },
  clickSelect:function(){

  },
  clickPlay:function(){
    var that = this;
    var i = that.data.playIndex == 0 ? 0 : that.data.playIndex;
    that.timer = setInterval(function () {
      i++
      if (i == that.data.polyline[0].points.length)
      {
        clearInterval(that.timer)
        return;
      }

      that.setData({
        playIndex: i,
        latitude: that.data.polyline[0].points[i].latitude,
        longitude: that.data.polyline[0].points[i].longitude,
        markers: [{
          iconPath: '../../image/car.png',
          id: 1,
          latitude: that.data.polyline[0].points[i].latitude,
          longitude: that.data.polyline[0].points[i].longitude,
          width: 30,
          height: 30,
          title: that.data.licenseNumber,
          callout: {
            content: that.data.licenseNumber + ' \n 时间：' + 1 + ' \n 速度：' + 1 + ' km/h',
            color: "#000000",
            fontSize: 13,
            borderRadius: 2,
            bgColor: "#fff",
            display: "ALWAYS",
            boxShadow: "5px 5px 10px #aaa"
          }
        }]
      })
     
    },500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item = JSON.parse(options.data);
    this.setData({
      licenseNumber: item
    });
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