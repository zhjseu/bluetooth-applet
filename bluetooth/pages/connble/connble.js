/** connble.js */

Page({
  data: {
    deviceId: '',
    name: '',
    RSSI: '',
    advData: '',
    serviceId: '',
    serviceList: [],
    serviceUUID: '',
    select: '',
    characteristics: [],
  },

  onLoad: function (opt) {
    var that = this;
    console.log("onLoad");
    console.log('deviceId=' + opt.deviceId);
    console.log('name=' + opt.name);
    console.log('RSSI=' + opt.RSSI);
    console.log('advData=' + opt.advData);
    //get data from scanble page url.
    that.setData({
      RSSI: opt.RSSI,
      name: opt.name,
      deviceId: opt.deviceId,
      advData: opt.advData,
    });
  },

  bindConnect: function () {
    var that = this;
    //create ble connection
    wx.createBLEConnection({
      deviceId: that.data.deviceId,
      //create conn. success
      success: function (res) {
        console.log(res);
        //get device services
        wx.getBLEDeviceServices({
          deviceId: that.data.deviceId,
          success: function (res) {
            console.log('device services:', res.services);
            that.setData({
              serviceList: res.services,
            })
            console.log('serviceList:', that.data.serviceList);
          },
        });
      },
      //create conn. fail
      fail: function (res) {
        wx.showToast({
          title: '建立连接失败',
          icon: 'loading',
          duration: 2000
        })
      },
    })

  },

  selectUUID: function (e) {
    var that = this;
    var uuid = e.currentTarget.dataset.uuid;
    console.log(uuid);
    //show selected service uuid
    that.setData({
      serviceUUID: uuid,
      select: 1,
    })

  },

  getCharc: function () {
    var that = this;
    if(that.data.select == ''){
      wx.showToast({
        title: '请先选择service uuid',
        icon: 'loading',
        duration: 2000
      })
    }
    //get specify sercive all of charc.
    wx.getBLEDeviceCharacteristics({
      deviceId: that.data.deviceId,
      serviceId: that.data.serviceUUID,
      success: function(res) {
        console.log('getBLEDeviceCharacteristics:', res.characteristics)
        that.setData({
          characteristics: res.characteristics,
        })
      },
    })

  },

})
