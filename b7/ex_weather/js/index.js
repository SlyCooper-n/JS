const g = (el) => document.querySelector(el);
const gall = (el) => document.querySelectorAll(el);

const input = g("input"),
    form = g("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (input.value == "") {
        return;
    }

    g(".result").style.opacity = "0";
    setTimeout(() => {
        g(".result").style.display = "none";
    }, 100);
    g("#load-state").innerHTML = "Loading...";

    let result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
            input.value
        )}&appid=0f2deb31dc609f60888f97f676d9e272&units=metric`
    );
    let resultJson = await result.json();

    if (resultJson.cod != 200) {
        g("#load-state").innerHTML = "City not found.";
        return;
    }

    renderWeatherInfo({
        city: resultJson.name,
        country: resultJson.sys.country,
        temp: resultJson.main.temp,
        icon: resultJson.weather[0].icon,
        weatherDesc: resultJson.weather[0].main,
        windSpeed: resultJson.wind.speed,
        windDirection: resultJson.wind.deg,
    });
});

function renderWeatherInfo(wob) {
    g("#load-state").innerHTML = "";

    g(".result h2").innerHTML = `${wob.city}, ${wob.country}`;
    g(".temp p").innerHTML = `${wob.temp} <sup>°C</sup>`;
    g(".temp img").src = `http://openweathermap.org/img/wn/${wob.icon}@2x.png`;
    g(".img-desc").innerHTML = `${wob.weatherDesc}`;

    g(".wind p").innerHTML = `${wob.windSpeed} <span>Km/h</span>`;
    g(".pointer").style.transform = `rotate(${wob.windDirection}deg)`;

    g(".result").style.display = "block";
    setTimeout(() => {
        g(".result").style.opacity = "1";
    }, 100);
}
