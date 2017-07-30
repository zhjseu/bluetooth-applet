/** scanble.js */

Page({
  data: {
    logs: [],
    list: [],
  },

  onShow: function () {
    console.log('onShow');
    var that = this;
    var dev = that.data.list; //temp device list
    
    //open bt. adapter
    wx.openBluetoothAdapter({
      //open bt. adapter success
      success: function (res) {
        console.log("openBluetoothAdapter: success");
        console.log(res);
        //start discovery devices
        wx.startBluetoothDevicesDiscovery({
          services: [],
          success: function (res) {
            console.log("startBluetoothDevicesDiscovery: success");
            console.log(res);
            //Listen to find new equipment
            wx.onBluetoothDeviceFound(function (res) {
              console.log('new device list has founded');
              console.log(res);
              //found one device only, reflesh device list each time
              dev.push(res.devices[0]);
              that.setData({
                list: dev
              });
              console.log('that.setData: list');
              console.log(that.data.list);
            })
          },
        })
      },

      //open bt. adapter fail
      fail: function (res) {
        console.log("openBluetoothAdapter: fail");
        console.log(res);
        wx.showToast({
          title: '搜索失败，请确认已经打开蓝牙',
          icon: "loading",
          duration: 3000
        })
      },
    })

  },

  onUnload: function () {
    //stop device discovery
    wx.stopBluetoothDevicesDiscovery({
      success: function (res) {
        console.log("stopBluetoothDevicesDiscovery: success");
      },
    })
    //close bt. adapter
    wx.closeBluetoothAdapter({
      success: function (res) {
        console.log("closeBluetoothAdapter: success");
      },
    })

  },

  connectDevice: function (e) {
    //stop device discovery
    wx.stopBluetoothDevicesDiscovery({
      success: function (res) {
        console.log(res)
      }
    })
    //get data from scanble.wxml
    var deviceid = e.currentTarget.dataset.deviceid;
    var name = e.currentTarget.dataset.name;
    var rssi = e.currentTarget.dataset.rssi;
    var advdata = e.currentTarget.dataset.advdata;
    console.log(deviceid);
    console.log(name);
    console.log(rssi);
    console.log(advdata);
    //navigate to new connble page with data
    wx.navigateTo({
      url: '../connble/connble?deviceId=' + deviceid + '&name=' + name + '&RSSI=' + rssi + '&advData=' + advdata,
    })

  },

})
