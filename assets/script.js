var userInput = $('#userInput')
// var currentDay = dayjs()
// var latitude = 
// var longitude = 


// Step 1. User input will fetch Lon + Lat for city using geocode api.
function getLocation(userInput) {
    var getLocationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=1&appid=cf5137880ed7efb4df6421327fe198d4`

    fetch(getLocationURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var lon = data[0].lon
            var lat = data[0].lat
            fiveDay(lon, lat)
            currentDay(lon, lat)
        });
}

// Step 2. Lon and Lat will be inputed into variables for weather api.
function fiveDay(longitude, lattitude) {
    var getWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lattitude}&lon=${longitude}&units=imperial&appid=cf5137880ed7efb4df6421327fe198d4`
    fetch(getWeatherURL)
        .then(function (response) {
            return response.json();
        })
        // grab weather at noon each day
        // Step 3. 5 day weather forecast for city will be returned and displayed on screen.
        .then(function (data) {
            console.log(data)
            for (var i = 5; i < data.list.length; i += 8) {
                var day = data.list[i]
                console.log(day)
                var weatherFiveDay = $('#weatherFiveDay')
                var windSpeed = day.wind.speed
                var temp = day.main.temp
                var humidity = day.main.humidity
                var icon = day.weather[0].icon
                var card = $(`<div class="card col-2">
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Current Weather</h5>
                  <p class="card-text">Temp: ${temp}</p>
                  <p class="card-text">Humidity: ${humidity}</p>
                  <p class="card-text">Wind Speed: ${windSpeed}</p>
                </div>
              </div>`)

                weatherFiveDay.append(card)

            }

        });
}
// grab weather for the current day
function currentDay(longitude, lattitude) {
    var getWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&units=imperial&appid=cf5137880ed7efb4df6421327fe198d4`
    fetch(getWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var currentWeather = $('#weatherCurrent')
            var windSpeed = data.wind.speed
            var temp = data.main.temp
            var humidity = data.main.humidity
            var icon = data.weather[0].icon
            var card = $(`<div class="card col-2">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Current Weather</h5>
              <p class="card-text">Temp: ${temp}</p>
              <p class="card-text">Humidity: ${humidity}</p>
              <p class="card-text">Wind Speed: ${windSpeed}</p>
            </div>
          </div>`)

            currentWeather.append(card)
        });
}

function saveCity(event) {
    // event.preventDefault()
    var city = userInput.val()
    localStorage.setItem('city', city)
    console.log(localStorage)

}

window.onload = function () {
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var city = localStorage.getItem(key);
      if (city) {
        var button = $('<button>').text(city).addClass('btn btn-secondary');
        button.click(function () {
          getLocation(city);
        });
        $('#previousSearch').append(button);
      }
    }
  };
  
$("#form").on("submit", function (event) {
    event.preventDefault();
    var city = $(this)[0][0].value
    getLocation(city)
    saveCity(city)
});



// Step 4. Previous city searches will be stored locally and displayed upon page refresh.


// temp, wind speed, humidity, icon (in weather array)
