let search = document.getElementById('searchbox');
let searchinput = document.getElementById('searchinput');
let resultbox = document.getElementById('resultbox');
let WeatherCont = document.querySelector("#resultbox").querySelectorAll("*");
// Weather Function
function getData(location) {
    let loc = location;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (this.status === 200) {
            let data = JSON.parse(this.responseText);
            console.log(data);
            WeatherCont[0].textContent = `Location : ${data.name}`;
            WeatherCont[1].textContent = `Country : ${data.sys.country}`;
            WeatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
            WeatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
            WeatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            WeatherCont[5].textContent = `Original Temperature : ${ktc(data.main.temp)}`;
            WeatherCont[6].textContent = `But it feels like ${ktc(data.main.feels_like)}`;
            WeatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
            WeatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
            WeatherState = `the weather in ${data.name} is ${data.weather[0].description}
            and the original temperature is ${ktc(data.main.temp)} but it's feels like ${ktc(data.main.feels_like)}`
        } else {
            WeatherCont[0].textContent = "Weather Not Found."
        }
    }

    xhr.send();
}

// Kevlin to Celcius
function ktc(k){
    k = k - 273.15
    return k.toFixed(2) + "\u00B0 Celcius";
}


function weather(){
    if( searchinput.value == ''){
        alert('Enter Your City');
    }
    else{
        getData(searchinput.value);
        search.style.display = 'none';
        resultbox.style.display = 'block';
    }
}

function closeit(){
    search.style.display = 'block';
    resultbox.style.display = 'none';
    WeatherCont[0].textContent = ``;
    WeatherCont[1].textContent = ``;
    WeatherCont[2].textContent = ``;
    WeatherCont[3].textContent = ``;
    WeatherCont[4].src = ``;
    WeatherCont[5].textContent = ``;
    WeatherCont[6].textContent = ``;
    WeatherCont[7].textContent = ``;
    WeatherCont[8].textContent = ``;
}

// Execute a function when the user presses a key on the keyboard
searchinput.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("searchbtn").click();
    }
  });

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        document.getElementById("searchbtn").click();
    }
});


document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        document.getElementById("closebtn").click();
    }
}
