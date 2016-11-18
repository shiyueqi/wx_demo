var formatLocation = require('./format-location.js')

Page({
    data: {
        hasWeather: false ,
        hasLocation: false ,
        locationInfo: ""
    },

    getWeatherInfo: function () {
        var that = this

        wx.getLocation({
            success: function (res) {
                var userLocation = formatLocation(res.longitude, res.latitude)
                var locLongitude = userLocation.longitude[0] + "." + userLocation.longitude[1]
                var locLatitude = userLocation.latitude[0] + "." + userLocation.latitude[1]
                var locationStr = locLatitude + ":" + locLongitude
                console.log("location in method after: " + locationStr) 

                wx.request({
                    //url: 'https://api.thinkpage.cn/v3/weather/now.json', 
                    url: 'http://api.thinkpage.cn:8080/test-web-1.0.0-SNAPSHOT/weather/now.json',
                    data: {
                        key: 'gsbcxn4bqxyvjg8r' ,
                        //location: that.data.locationInfo ,
                        //location: locationStr ,
                        location: '41.90:123.41',
                        language: 'zh-Hans',
                        unit: 'c'
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function(res) {
                        that.setData({
                            hasWeather: true,
                            locationInfo: locationStr,
                            weatherInfo: res.data.results[0]
                        })
                        //that.update()

                        console.log(res)
                    }
                })        
            }
        })
    } ,

    clear: function () {
        this.setData({
            hasWeather: false,
            weatherInfo: {},
            locationInfo: ""            
        })
    }
})
