// asynchronous i/o
const input = document.querySelector('.input-field');

function showSubmitButton() {
  const submit = document.querySelector('.submit-container');

  if (input.value.length >= 0) {
    submit.style.opacity = '1';
  } else {
    submit.style.opacity = '0';
  }
}

input.addEventListener('input', showSubmitButton);

 
const submit = document.querySelector('.submit-btn')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')

input.addEventListener('keyup', (e)=> {
    if(e.which == 13) {
        // submit
        submit.click()
        console.log('enter clicked')
    }
})

message1.textContent =''
message2.textContent =''

submit.addEventListener('click', (e) => {
    
    const location = input.value


    message1.textContent ="searching...";
    message2.textContent ="";
    message3.textContent ="";

    
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                message1.textContent = data.error;
            } else {
                if(data.weather.current.temp < 15) {
                    message2.style = 'color: #04ccff'
                } else if (data.weather.current.temp >= 15 && data.weather.current.temp < 28) {
                    message2.style = 'color: #00F811'
                } else {
                    message2.style = 'color: #FF9934'
                }
                
                message1.textContent = `${data.weather.location.suburb}, ${data.weather.location.city}, ${data.weather.location.country}`
                message2.textContent = `${data.weather.current.description[0]}: It is currently ${data.weather.current.temp} degrees, and it feels like ${data.weather.current.feelsLike} degrees.`
                let wind = data.weather.current.windSpeed;
                let windDescription = ""
                switch(wind) {
                    case wind < 5:
                        windDescription = "Not that windy!"
                        break
                    case wind >= 5 && wind < 25:
                        windDescription = "Pretty windy!"
                        break
                    case wind >= 25:
                        windDescription = "It's VERY windy!"
                        break
                }
                
                message3.textContent = `${windDescription} The wind speed is ${data.weather.current.windSpeed} km/h and it's going towards ${data.weather.current.windDirection}`
            }

        // console.log(data.weather)
    })
})
})

const locationString = (location) => {
    return `${location.suburb}`
}

