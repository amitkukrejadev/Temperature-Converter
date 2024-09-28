const API_KEY = '2a80d84da44cf91637168ffb32a7e9a8'; // Your API Key

// Function to get weather data
function getWeatherData(city, country) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.querySelector('.weather h1').innerText = `${Math.round(data.main.temp)}°C`;
                document.getElementById('weatherCondition').innerText = `${data.weather[0].description} ${Math.round(data.main.temp_max)}°/${Math.round(data.main.temp_min)}°`;
                document.querySelector('.aqi p:first-of-type').innerText = `AQI ${data.main.humidity}`;
                setBackground();
            } else {
                alert('City not found!');
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// Handle add city button
document.getElementById('addCityIcon').addEventListener('click', () => {
    document.getElementById('addCityOverlay').classList.add('active');
});

document.getElementById('addCityBtn').addEventListener('click', () => {
    const location = document.getElementById('locationSearch').value;
    if (location) {
        const [city, country] = location.split(',').map(item => item.trim());
        getWeatherData(city, country);
        document.getElementById('addCityOverlay').classList.remove('active'); // Close overlay
    }
});

// Close overlay when clicking outside of the search box
document.addEventListener('click', (event) => {
    if (!document.querySelector('.search-box').contains(event.target) && event.target.id !== 'addCityIcon') {
        document.getElementById('addCityOverlay').classList.remove('active');
    }
});

// Add scroll animation
function addScrollAnimation() {
    window.addEventListener('scroll', () => {
        document.querySelector('.content').style.transform = 'translateY(' + window.scrollY / 2 + 'px)';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setBackground();
    addScrollAnimation();
});
