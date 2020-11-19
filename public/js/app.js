

const weatherForm = document.querySelector('form')
const search =  document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')
const messageThree = document.getElementById('message-3')


weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    
    messageOne.innerText='Loading...'
    const location = search.value
    fetch('/weather?address='+location).then(resp => {
        resp.json().then(data => {
            if(data.error){
                messageOne.innerText = data.error
            }else{
                messageOne.innerText = data.location
                messageTwo.innerText = `It is currently ${data.temperature} degrees and feels like  ${data.feelsLike}! You can expect wind speeds of ${data.windSpeed} mph. `
                messageThree.innerText = data.forecast.toLowerCase()
            }
        })
    })
    
})      

// Goal: Use input value to get weather 
// 1. Migrate fetch call into the submit button
// 2. Use the search text as the address query string value
// 3. Submit the form with a valid and invalid value to test

// Goal: Render contents to paragraph tag 
// 1. Select the second paragraph 
// 2. just before fetch, render loading message and empty p
// 3. if error, render error 
// 4. If no error, render location and forecast 
// Test your work, search for errors and valid locations 
