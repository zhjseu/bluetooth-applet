/** index.js */

var app = getApp()
Page({

  onLoad: function () {
    console.log('onLoad')

  },

  scanList: function () {
    wx.navigateTo({
      url: '../scanble/scanble'
    })
  }

})
