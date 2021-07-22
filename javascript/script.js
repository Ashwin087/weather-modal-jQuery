// 1) Create object space
const weatherApp = {};
weatherApp.apiKey = '50b1110c75cb46eba00fea682c16968d';


// 5) Have Array of Data. Filter and Display Relevant Data.  
weatherApp.displayWeather = (weekWeatherData) => {
    const mappedWeatherData = weekWeatherData.map((dailyWeatherData) => {
        const {temp, max_temp, min_temp, weather} = dailyWeatherData
        const weatherHTML = `
        <div class="today-weather">
            <div class="modal-flex">
                    <h4 class="today-temp">Current Temperature: <span> ${Math.round(temp)}° C</span></h4>
                    <img src="./styles/icons/${weather.icon}.png" alt="Weather Icon According to Temperature">
                    <div class="modal-high-low">
                    <div class="modal-high-low">
                        <h5>Today's Low: <span>${Math.round(min_temp)}° C</span></h5>
                        <h5>Today's High: <span>${Math.round(max_temp)}° C</span></h5>
                    </div>
            </div>
        </div>
        `;
        return weatherHTML;
    });

    $('.today-weather').html('');
    const citySearchTerm = $('#search-input').val();
    $('.modal-city-name').text(`Forecast For ${citySearchTerm}!`);
    $('.modal-results').addClass('active');
    $('.modal-overlay').addClass('active');
    $('.modal-body').prepend(mappedWeatherData);
};


// 3 & 4) Have Search Term. Make API Call to Get Weather Data Array (AJAX)
weatherApp.searchFunction = (citySearchTerm) => {
    $.ajax({
        url: 'https://api.weatherbit.io/v2.0/forecast/daily',
        method: 'GET',
        dataType: 'json',
        data: {
            key: weatherApp.apiKey,
            days: 1,
            country: 'CA',
            city: citySearchTerm
        }
    }).then((cityWeatherData) => {
        if (cityWeatherData) {
            const weekWeatherData = cityWeatherData.data;
            weatherApp.displayWeather(weekWeatherData);
            $('#pop-up-close-button').focus();
        } else {
            alert(`Could not find "${citySearchTerm}", please try again`)
        };
    });

};


// 6) How to Close Modal Once Activated
const closeModal = () => {
    $('.modal-results').removeClass('active');
    $('.modal-overlay').removeClass('active')
}


// Event Listeners to close modal
$('.modal-close-button').click((event) => {
    event.preventDefault();
    closeModal();
});

$(document).keydown((event) => {
    if (event.key == "Escape") {
        closeModal();
    };
});

$('.modal-results').on('click', 'button', (event) => {
    event.preventDefault();
    closeModal();
});


// 7 Define Init Function
weatherApp.init = () => {
// 2) Only have Home Screen. Listen for Search Button & Store Value
$('#search-button').click((event) => {
    event.preventDefault();
    const citySearchTerm = $('#search-input').val();
    if (citySearchTerm == ""){
        alert('Please type in your city name')
    } else {
        weatherApp.searchFunction(citySearchTerm);
    };
});
}

// 8) Call Init within Document Ready
$(() => {
    weatherApp.init();
})

// Pseudo Code (Console Log Through Out):
// 0) Test AJAX / See what comes back from API call

// Code organization
// 1) Create object space 
// Put API Key within object space

// Only thing on Page is Search Bar
// 2) Event listener for click on search button 
    // Get and store search value 
    // If statement to alert if no value is entered
    // Run search value into a function 

// Doing something with the data
// 3) Define search function 
    // Make API call (AJAX) using search value term
        // Should return array with weather info
        // Store returned information in a variable    
// 4) Then 
    // Call display function to show modal
        // Call function to load weather info  

// Processing to get information displayed on page
// 5) Define display function
    // Map to get array with relevant temperature data
    // Destructure array to get array with relevant data
        // City Name, Current Temp, Today's High & Low
        // If possible, if statement to round up or down
    // Append opposed to modifying HTML.

// User looking at Modal with Info
// 6) When clicking on close button or pressing escape, clear HTML and hide modal (remove class) 
    // 3 Different Event Listeners
    // Define and call close modal function

// Setup accordingly
// 7) Organize Page Ready (Init)
// 8) Organize Init (use event listener from step 2) 