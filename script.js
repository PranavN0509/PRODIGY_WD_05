function getWeather(){
    const apiKey = "86094e4d02fa9384f857099acb8c5bb6"
    const city_name = document.getElementById("city-name").value;
    if(!city_name){
        return;
    }


    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    })
    .catch(error => {
        console.error("Error Fetching Current Weather. ", error)
        alert("Error fetching current weather data. Please try again.")
    });


    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        displayHourlyForecast(data.list);
    })

    .catch(error => {
        console.error("Error Fetching Hourly Forecast. ", error)
        alert("Error fetching hourly forecast data. Please try again.")
    });
}

function displayWeather(data){
    const tempDivInfo = document.getElementById("temp-div");
    const weatherInfoDiv = document.getElementById("weather-info");
    const weathericon = document.getElementById("weather-icon");
    const hourlyforecastDiv = document.getElementById("hourly-forecast");

    weatherInfoDiv.innerHTML = "";
    hourlyforecastDiv.innerHTML = "";
    tempDivInfo.innerHTML = ""

    if(data.cod === "404"){
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    }
    else{
        const cityname = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description
        const iconCode = data.weather[0].icon
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHTML = `
        <p>${cityname}</p>
        <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weathericon.src = iconUrl;
        weathericon.alt = description;
        
        showImage();
    }
}


function displayHourlyForecast(hourlyData){
    const hourlyforecastDiv = document.getElementById("hourly-forecast");

    const next24hours = hourlyData.slice(0, 8);

    next24hours.forEach(item =>{
        const dateTime = new Date(item.dt*1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        console.log(iconUrl);

        const hourlyItemHtml = `
        <div class="hourly-item">
        <span>${hour}:00</span>
        <img src="${iconUrl}" alt="Hourly Weather Icon">
        <span>${temperature}°C</span>
        `;

        hourlyforecastDiv.innerHTML += hourlyItemHtml;
    });
}


function showImage(){
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.style.display = "block";
    const weatherInfoDiv = document.getElementById("weather-info");
    weatherInfoDiv.style.display = "block";
}