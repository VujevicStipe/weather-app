let weatherApp = {
    "apiKey" : "80b3cbd1d5d2ee3b54623084bd81c897",
    fetchWeather: function(city) {
        const proxy = "http://cors-everywhere.herokuapp.com/";
        fetch(proxy + "https://api.openweathermap.org/data/2.5/weather?lat=" + city + "&units=metric&appid=" + this.apiKey)
    .then((response) => response.json())
    .then((data) => this.getWeather(data))
    },

    //function to pull and display data you want
    getWeather: function(data) {
        const {name} = data;
        const {temp, feels_like, pressure, humidity} = data.main;
        const {icon, description} = data.weather[0];
        const {speed} = data.wind;
        console.log(icon)
    
        //display values into html
        document.querySelector('.infoName').innerHTML = name;
        document.querySelector('.infoDegree').innerHTML = temp + "°C";
        document.querySelector(".infoIcon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.infoDescription').innerHTML = description;
        document.querySelector('.infoFeel').innerHTML = "Feels like:" + feels_like;
        document.querySelector('.infoWind').innerHTML = "Wind Speed:" + speed;
        document.querySelector('.infoHumidity').innerHTML = "Humidity" + humidity;
        document.querySelector('.infoPressure').innerHTML = "Air pressure:" + pressure;

        //remove class of loading when you first search
        document.querySelector(".info").classList.remove("loading");
    },

    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weatherApp.search();
})

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key == "Enter"){
        weatherApp.search();
    }
});

weatherApp.fetchWeather("Tokyo");
