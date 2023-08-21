let weather = {
    "apikey": "aecd274abf3086354bb5974c5a3f244c",
    fetchweather: function (city) {
        fetch
            (
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apikey
            )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayw(data));
    },
    displayw: function (data) {
        const { name } = data;
        const { country } = data.sys;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { feels_like } = data.main;
        const { visibility } = data;
        const { pressure } = data.main;
        console.log(name, icon, description, temp, humidity, speed);

        document.querySelector(".city").innerText = name+", "+country;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".feels_like").innerText = "Feels like " + feels_like + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".visibility").innerText = "Visibility: "+(visibility/1000)+" km";
        document.querySelector(".pressure").innerText = "Air Pressure: "+pressure+" hPa";
        document.querySelector(".weather").classList.remove("loading");

        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    
        
    },
    search: function () {
        this.fetchweather(document.querySelector(".searchb").value)
    }
};
let gcode = 
{
    reversegcode: function (latitude, longitude) 
    {
            var api_key = '297f80bce2714fc1ad1a52d9a5f632e8';

            var api_url = 'https://api.opencagedata.com/geocode/v1/json'

            var request_url =
            api_url +
            "?" +
            "key=" +
            api_key +
            "&q=" +
            encodeURIComponent(latitude + "," + longitude) +
            "&pretty=1" +
            "&no_annotations=1";

            // see full list of required and optional parameters:
            // https://opencagedata.com/api#forward

            var request = new XMLHttpRequest();
            request.open('GET', request_url, true);

            request.onload = function () 
            {
                // see full list of possible response codes:
                // https://opencagedata.com/api#codes

                if (request.status === 200) 
                {
                    // Success!
                    var data = JSON.parse(request.responseText);
                    weather.fetchweather(data.results[0].components.city);
                } 
                else if (request.status <= 500) 
                {
                    // We reached our target server, but it returned an error

                    console.log("unable to geocode! Response code: " + request.status);
                    var data = JSON.parse(request.responseText);
                    console.log('error msg: ' + data.status.message);
                } else 
                {
                    console.log("server error");
                }
            };

            request.onerror = function () 
            {
                // There was a connection error of some sort
                console.log("unable to connect to server");
            };
            request.send();
    },
    getloc:function()
    {
        function success(data)
        {
            gcode.reversegcode(data.coords.latitude,data.coords.longitude);
        }
        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(success,console.error);
        }
        else
        {
            weather.fetchweather("Mumbai");
        }
    }
};
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});
document.querySelector(".searchb").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

gcode.getloc();






















