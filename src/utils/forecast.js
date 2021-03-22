const request = require('request')

const forecast = (latitude, longitude, callback) => {

const url = 'http://api.weatherstack.com/current?access_key=578f0db84d0cf0119aa7c3856ec8d660&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather service', undefined)
        } else if (body.success === false){
            callback('Location not found. Try again.', undefined)
        } else {

            const data = 'It is ' +  body.current.temperature + ' degrees today. It feels like ' + body.current.feelslike + ' degrees.' 
        

            callback(undefined, data)
        }
    })
}




module.exports = forecast