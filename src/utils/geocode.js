const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoibmVsc29uaGEiLCJhIjoiY2s4bzdlNHR1MHhuNzNnbjFqNmlsdzI2dCJ9.PSxYNDGZ4X9l0zZD0mlwMQ";

    request({ url:url, json: true }, (error, response) => {
        // const placeName = response.body.features[0].place_name.split(',');
        // const place = []
        // placeName.forEach(item => place.push(item.trim()))
    
        // const [ suburb, state, country ] = place;
        // console.log(response.body.features[0])

        if(error) {
            callback("Unable to connect to location services", undefined)
        } else if (response.body.features.length === 0) {
            callback("Can't find location!", undefined) 
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
            })
        }

    })
}

module.exports = geocode