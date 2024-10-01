// fetch('./form-js/data.json')
//     .then(response => response.json())
//     .then(data => {
//         const stateSelect = document.getElementById('state');
//         const citySelect = document.getElementById('city');

//         data.forEach(state => {
//             const option = document.createElement('option');
//             option.value = state.name;
//             option.textContent = state.name;
//             stateSelect.appendChild(option);
//         });

//         function populateCities(selectedState) {
//             citySelect.innerHTML = '<option value="" class="flex w-full h-full text-sm py-2 " disabled selected>Select City</option>';

//             const stateObj = data.find(state => state.name === selectedState);

//             if (stateObj) {
//                 stateObj.cities.forEach(city => {
//                     const option = document.createElement('option');
//                     option.value = city.name;
//                     option.textContent = city.name;
//                     citySelect.appendChild(option);
//                 });
//             }
//         }
//         stateSelect.addEventListener('change', function () {
//             populateCities(this.value);
//             citySelect.disabled = false; // Enable city dropdown
//         });
//     })
//     .catch(error => console.error('Error fetching data:', error));



fetch('./form-js/country.json')
    .then(response => response.json())
    .then(data => {
        const countrySelect = document.getElementById('countrySelect');

        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.countryCode;
            option.textContent = country.countryCode;
            countrySelect.appendChild(option);
        });

        countrySelect.value = "+91";

        countrySelect.addEventListener('change', function () {
            const countryCode = this.value;
            const locationDivs = document.getElementsByClassName('location');

            const locationArray = Array.from(locationDivs);

            if (countryCode === "+91") {
                locationArray.forEach(div => {
                    if (div.style.display !== 'block') {
                        div.style.display = 'block';
                    }
                });
            } else {
                locationArray.forEach(div => {
                    if (div.style.display !== 'none') {
                        div.style.display = 'none';
                    }
                });
            }
        });
    })
    .catch(error => console.error('Error fetching countries:', error));



function initializeSearch(stateInputId, cityInputId, stateResultsId, cityResultsId, dataUrl) {
    const stateSearchInput = document.getElementById(stateInputId);
    const citySearchInput = document.getElementById(cityInputId);
    const stateResults = document.getElementById(stateResultsId);
    const cityResults = document.getElementById(cityResultsId);

    stateResults.style.display = 'none';
    stateResults.style.visibility = 'hidden';
    cityResults.style.display = 'none';
    cityResults.style.visibility = 'hidden';

    let statesData = [];

    async function loadStates() {
        try {
            const response = await fetch(dataUrl);
            statesData = await response.json();
        } catch (error) {
            console.error('Error loading states:', error);
        }
    }

    function displayAllStates() {
        stateResults.innerHTML = '';
        statesData.forEach(state => {
            const li = document.createElement("li");
            li.classList.add("search-li");
            li.textContent = state.name;
            li.onclick = () => selectState(state);
            stateResults.appendChild(li);
        });
        stateResults.style.display = 'block';
        stateResults.style.visibility = 'visible';
    }

    function displayAllCities(selectedState) {
        cityResults.innerHTML = '';
        if (Array.isArray(selectedState.cities)) {
            selectedState.cities.forEach(cityObj => {
                const city = cityObj.name.toLowerCase();
                const li = document.createElement("li");
                li.classList.add("search-li");
                li.textContent = city;
                li.onclick = () => selectCity(city);
                cityResults.appendChild(li);
            });
        }
        cityResults.style.display = 'block';
        cityResults.style.visibility = 'visible';
    }

    function searchStates() {
        const searchTerm = stateSearchInput.value.toLowerCase();
        stateResults.innerHTML = '';
        statesData.forEach(state => {
            if (state.name.toLowerCase().includes(searchTerm)) {
                const li = document.createElement("li");
                li.classList.add("search-li");
                li.textContent = state.name;
                li.onclick = () => selectState(state);
                stateResults.appendChild(li);
            }
        });
        if (searchTerm !== '' && stateSearchInput === document.activeElement) {
            stateResults.style.display = 'block';
            stateResults.style.visibility = 'visible';
        } else {
            stateResults.style.display = 'none';
            stateResults.style.visibility = 'hidden';
        }
    }

    function searchCities(selectedState) {
        const searchTerm = citySearchInput.value.toLowerCase();
        cityResults.innerHTML = '';

        if (Array.isArray(selectedState.cities)) {
            selectedState.cities.forEach(cityObj => {
                const city = cityObj.name.toLowerCase();
                if (city.includes(searchTerm)) {
                    const li = document.createElement("li");
                    li.classList.add("search-li");
                    li.textContent = city;
                    li.onclick = () => selectCity(city);
                    cityResults.appendChild(li);
                }
            });
        }
        cityResults.style.display = 'block';
        cityResults.style.visibility = 'visible';
    }

    function selectState(selectedState) {
        stateSearchInput.value = selectedState.name;
        stateResults.style.display = 'none';
        stateResults.style.visibility = 'hidden';
        citySearchInput.disabled = false;
        displayAllCities(selectedState);
    }

    function selectCity(city) {
        const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
        citySearchInput.value = capitalizedCity;
        cityResults.style.display = 'none';
        cityResults.style.visibility = 'hidden';
    }

    stateSearchInput.addEventListener("input", searchStates);

    stateSearchInput.addEventListener("focus", displayAllStates);

    citySearchInput.addEventListener("focus", function () {
        const selectedStateName = stateSearchInput.value.toLowerCase();
        const selectedState = statesData.find(state => state.name.toLowerCase() === selectedStateName);
        if (selectedState) {
            displayAllCities(selectedState);
        }
    });

    citySearchInput.addEventListener("input", function () {
        const selectedStateName = stateSearchInput.value.toLowerCase();
        const selectedState = statesData.find(state => state.name.toLowerCase() === selectedStateName);
        if (selectedState) {
            searchCities(selectedState);
        }
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('#' + stateInputId)) {
            stateResults.style.display = 'none';
            stateResults.style.visibility = 'hidden';
        }
        if (!event.target.closest('#' + cityInputId)) {
            cityResults.style.display = 'none';
            cityResults.style.visibility = 'hidden';
        }
    });

    citySearchInput.disabled = true;
    loadStates();
}

document.addEventListener('DOMContentLoaded', function () {
    initializeSearch("state", "city", "stateResults", "cityResults", "./form-js/data.json");
    initializeSearch("state1", "city1", "stateResults1", "cityResults1", "./form-js/data.json");
});