window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let weatherIcon = document.querySelector(".weather-icon");
    let weatherFeelsLike = document.querySelector(".weather-feels-like");
    let searchCity = document.querySelector(".search");
    let cityName = document.querySelector("#city");
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=031c7481086054713c332c1e1f74cde9`
        
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                   
                    const {feels_like,temp} = data.current;
                    const {main, icon} = data.current.weather[0];                   
                    const timezone = data.timezone;
                    //Set DOM Elements from the API
                    locationTimezone.textContent = timezone;
                    weatherIcon.innerHTML = `<img src="icons/${icon}.png"/>`;
                    temperatureDegree.textContent = (temp - 273.15).toPrecision(3);
                    temperatureDescription.textContent = main;
                    weatherFeelsLike.textContent = (feels_like - 273.15).toPrecision(3);
                           
                 
                })
        
        });

        


    }else{
        // locationTimezone.textContent = 'Required: Location Access!!!'
        alert('wdncehe');
    }

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
                
                console.log(data);
                console.log(temp, name, feels_like, icon, main);

                //Set DOM Elements from API
                locationTimezone.textContent = name;
                weatherIcon.innerHTML = `<img src="icons/${icon}.png"/>`;
                temperatureDegree.textContent = (temp - 273.15).toPrecision(3);
                temperatureDescription.textContent = main;
                weatherFeelsLike.textContent = (feels_like - 273.15).toPrecision(3);

            })
    })
    
    
})