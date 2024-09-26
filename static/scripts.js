document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;

    fetch('/weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: city })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('weather-result').innerHTML = `<p>${data.error}</p>`;
        } else {
            document.getElementById('weather-city').textContent = `${data.city}, ${data.country}`;
            document.getElementById('weather-temperature').textContent = `Temperature: ${data.temperature} °C`;
            document.getElementById('weather-description').textContent = `Description: ${data.description}`;
            
            // Dynamically load the weather icon and show it
            const iconElement = document.getElementById('weather-icon');
            iconElement.src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
            iconElement.style.display = 'block';  // Make the icon visible
            
            // Show the rest of the weather details
            document.getElementById('weather-city').style.display = 'block';
            document.getElementById('weather-temperature').style.display = 'block';
            document.getElementById('weather-description').style.display = 'block';

            // Change background color based on temperature
            const temperature = data.temperature;
            if (temperature < 10) {
                document.body.style.backgroundColor = "#6699CC";  // Dark Blue for <10C
            } else if (temperature >= 10 && temperature <= 25) {
                document.body.style.backgroundColor = "#0074D9";  // Blue for 10C-25C
            } else {
                document.body.style.backgroundColor = "#89CFF0";  // Light Blue for >25C
            }
        }
    });
});
