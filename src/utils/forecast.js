const request = require('request')

const forecast = (x, y, callback) => {
    const url = "http://api.weatherstack.com/forecast?access_key=942e830b3b7c50eb4bde62ba6cb2e330&query="+ x + ',' + y;


    request({ url: url, json: true }, (error, { body } = {}) => {



        if(error) {
            callback("check if u connected to the web", undefined)
        } else if (body.error) {
            callback("cant find location", )
        } else {

            let timezone = body.location.timezone_id;
            timezone = timezone.split('/') 
            let city = timezone[1]
    
            let date = body.location.localtime.split(' ')[0]
    
            let time = body.location.localtime.split(' ')[1]
    
            let current = body.current;

            callback(undefined, {
                location: {
                    suburb: body.location.name,
                    city,
                    country: body.location.country,
                },
                date,
                time,
                isDay: current.is_day,
                current: {
                    temp: current.temperature,
                    icon: current.weather_icons,
                    description: current.weather_descriptions,
                    windSpeed: current.wind_speed,
                    windDirection: current.wind_dir,
                    humidity: current.humidity,
                    feelsLike: current.feelslike,
                    cloudCover: current.cloudcover + '%',
                },
            })
        }
        // console.log(response.body)
    })


}


module.exports = forecast