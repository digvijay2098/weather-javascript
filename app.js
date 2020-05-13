window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let tempertaureUnit = document.querySelector(".section-degree span")
    let locationTimezone = document.querySelector(".location-timezone");
    let weatherIcon = document.querySelector(".weather-icon");
    let weatherFeelsLike = document.querySelector(".weather-feels-like");
    let searchCity = document.querySelector(".search");
    let cityName = document.querySelector("#city");
    var unit = '°c';



    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=031c7481086054713c332c1e1f74cde9`
        
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {feels_like,temp} = data.main;
                    const {main, icon} = data.weather[0];                   
                    const timezone = data.name;
                    const {country} = data.sys;
                    //Set DOM Elements from the API
                    locationTimezone.textContent = timezone+", "+country;
                    weatherIcon.innerHTML = `<img src="icons/${icon}.png"/>`;
                    temperatureDegree.textContent = (temp - 273.15).toPrecision(3);
                    temperatureDescription.textContent = main;
                    weatherFeelsLike.textContent = (feels_like - 273.15).toPrecision(3);
                })
        
        })   


    }


    //Show weather by searching city name
    searchCity.addEventListener('click', ()=>{
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=031c7481086054713c332c1e1f74cde9`;

        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {temp,feels_like} = data.main;
                const {name} = data;
                const {icon, main} = data.weather[0];
                const {country} = data.sys;
                
                

                //Set DOM Elements from API
                locationTimezone.textContent = name +", "+ country;
                weatherIcon.innerHTML = `<img src="icons/${icon}.png"/>`;
                temperatureDegree.textContent = (temp - 273.15).toPrecision(3);
                temperatureDescription.textContent = main;
                weatherFeelsLike.textContent = (feels_like - 273.15).toPrecision(3);
                tempertaureUnit.textContent = '°C';

            })
    })


    //Celsius to fahrenheit conversion
    function celsiusToFahrenheit(temperature){
        return (temperature * 9/5) + 32;
    }

    //Fahrenheit to celsius conversion
    function FahrenheitToCelsius(temperature){
        return (temperature - 32)*5/9;
    }
    
   //Toggle between celsius and fahrenheit
    temperatureDegree.addEventListener('click', ()=>{
        
        
        if(tempertaureUnit.textContent == '°C'){
            temperatureDegree.textContent = celsiusToFahrenheit(temperatureDegree.textContent).toPrecision(3);
            tempertaureUnit.textContent = '°F';
            
        }else{
            
            temperatureDegree.innerHTML = FahrenheitToCelsius(temperatureDegree.textContent).toPrecision(3);
            tempertaureUnit.textContent = '°C';
            
        }
    })


    
    
})