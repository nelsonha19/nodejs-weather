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

    
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                message1.textContent = data.error;
            } else {
                message1.textContent = `${data.weather.location.suburb}, ${data.weather.location.city}, ${data.weather.location.country}`
                message2.textContent = `${data.weather.current.description[0]}: It is currently ${data.weather.current.temp} degrees, and it feels like ${data.weather.current.feelsLike} degrees.`
            }

        // console.log(data.weather)
    })
})
})

const locationString = (location) => {
    return `${location.suburb}`
}

