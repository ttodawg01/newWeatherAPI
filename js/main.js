import { myAPIkey } from "../APIkey.js";

{
    // get the form id
    let form = document.getElementById('weatherForm');
    // console.log(form) //success

    // creating a function to handle the submit
    async function handleSubmit(e){
        e.preventDefault();
        // console.log(e);
        let WeatherCity = e.target.weatherName.value;
        let weatherInfo = await GetWeatherInfo(WeatherCity);
        buildWeathercard(weatherInfo)
        // console.log(weatherInfo);
        e.target.weatherName.value = '';
    };

    async function GetWeatherInfo(WeatherCity){
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${WeatherCity}&appid=${myAPIkey}`);
        let data = await response.json()
        return data
    };
    console.log(GetWeatherInfo('chicago'))

    // make the card functions this one being the card itself
    function buildWeathercard(WeatherObj){

        console.log(WeatherObj)
        let display = document.getElementById('weatherDisplay');
        let card = document.createElement('div')
        card.className = 'card h-100'
        card.style.width = '75rem'
        display.append(card)

        let Order = document.createElement('ul')
        Order.className = "list-group list-group-flush";
        card.append(Order)

        let VeryFirstLine = document.createElement('li')
        VeryFirstLine.className = "list-group-item"
        VeryFirstLine.innerHTML = (`${WeatherObj.name}`)
        Order.append(VeryFirstLine)

        let FirstLine = document.createElement('li')
        FirstLine.className = "list-group-item"
        FirstLine.innerHTML = (`Max temp: ${Math.round((WeatherObj.main.temp_max-273.15)*1.8)+32+'℉'}`)
        Order.append(FirstLine)

        let SecondLine = document.createElement('li')
        SecondLine.className = "list-group-item"
        SecondLine.innerHTML = (`Min Temp: ${Math.round((WeatherObj.main.temp_min-273.15)*1.8)+32+'℉'}`)
        Order.append(SecondLine)

        let ThirdLine = document.createElement('li')
        ThirdLine.className = "list-group-item"
        ThirdLine.innerHTML = (`Feels like: ${Math.round((WeatherObj.main.feels_like-273.15)*1.8)+32+'℉'}`)
        Order.append(ThirdLine)
        
        let FourthLine = document.createElement('li')
        FourthLine.className = "list-group-item"
        FourthLine.innerHTML = (`Current: ${Math.round((WeatherObj.main.temp-273.15)*1.8)+32+'℉'}`)
        Order.append(FourthLine)

    }

    // add the event listener outside the main scope
    form.addEventListener('submit',(event)=> handleSubmit(event));
}