//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    car: {
      licenseNumber: '',
      vehicleBran: '',
      vehicleModel: '',
      vehicleType: '',
      color: '',
      productionDate: '',
      purchasingDate: '',
      employees: '',
      departments: '',
      notes: ''
    },
    pic: [],
    isShow: false,
    licenseNumber: '',
  },
  clickImg: function(e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.pic // 需要预览的图片http链接列表
    })
  },
  clickGps: function() {
    var that = this;
    let data = JSON.stringify(that.data.licenseNumber);
    wx.navigateTo({
      url: '../positioning/index?data=' + data,
    })
  },
  clickPlayBack: function() {
    var that = this;
    let data = JSON.stringify(that.data.licenseNumber);
    wx.navigateTo({
      url: '../playback/index?data=' + data,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let item = JSON.parse(options.data);
    item.info.productionDate = item.info.productionDate.substring(0, 10);
    item.info.purchasingDate = item.info.purchasingDate.substring(0, 10);
    let isShows = false;
    if (item.pic.length > 0) {
      isShows = true;
    }
    for (var i = 0; i < item.pic.length; i++) {
      this.data.pic.push(app.globalData.imgapiUrl + item.pic[i].picPath);
    }
    this.setData({
      car: item.info,
      pic: this.data.pic,
      isShow: isShows,
      licenseNumber: item.info.licenseNumber
    });
  },
})