// Data for districts, tehsils, and police stations
const data = {
    "districts": [
        {
            "name": "Kupwara"
        },
        {
            "name": "Pulwama"
        },
        {
            "name": "Shopian"
        },
        {
            "name": "Srinagar"
        }
        // Add more districts here...
    ],
    "tehsils": {
        "Kupwara": ["Kupwara", "Handwara", "Langate", "Tangdar", "Lolab", "Sogam"],
        "Srinagar": ["Srinagar", "Badgam", "Ganderbal", "Beerwah", "Chadoora"],
        "Pulwama": ["Pulwama", "Awantipora", "Tral", "Pampore", "Rajpora"],
        "Shopian": ["Shopian", "Keller", "Zainapora", "Wachi"]
    },

    "stations": {
        "Kupwara": {
            "Kupwara": ["Police Station Kupwara","Police Station 2","police Station 3"],
            "Handwara": ["Police Station Handwara","Police Station Mawer","Police Station Zachaldara"],
            "Langate": ["Police Station Langate","Police Station Rafiaabad","Police Station 2","police Station 3"],
            "Tangdar": ["Police Station Tangdar", "Police Station Keran"],
            "Lolab": ["Police Station Lolab","Police Station 2","police Station 3"],
            "Sogam": ["Police Station Sogam","Police Station 2","police Station 3"]
        },
        "Pulwama": {
            "Pulwama": ["Police Station Pulwama","Police Station 2","police Station 3"],
            "Awantipora": ["Police Station Awantipora","Police Station 2","police Station 3"],
            "Tral": ["Police Station Tral","Police Station 2","police Station 3"],
            "Pampore": ["Police Station Pampore","Police Station 2","police Station 3"],
            "Rajpora": ["Police Station Rajpora","Police Station 2","police Station 3"]
        },
        "Shopian": {
            "Shopian": ["Police Station Shopian","Police Station 2","police Station 3"],
            "Keller": ["Police Station Keller"],
            "Zainapora": ["Police Station Zainapora","Police Station 2","police Station 3"],
            "Wachi": ["Police Station Wachi","Police Station 2","police Station 3"]
        },
        "Srinagar": {
            "Srinagar": ["Police Station Srinagar","Police Station 2","police Station 3"],
            "Badgam": ["Police Station Badgam","Police Station 2","police Station 3"],
            "Ganderbal": ["Police Station Ganderbal","Police Station 2","police Station 3"],
            "Beerwah": ["Police Station Beerwah","Police Station 2","police Station 3"],
            "Chadoora": ["Police Station Chadoora","Police Station 2","police Station 3"]
        }
    }
};

// Function to populate dropdown based on selected data
function populateDropdown(selectedData, dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = '<option value="">Select Option</option>'; // Clear existing options
    selectedData.forEach(item => {
        const option = document.createElement('option');
        option.textContent = item;
        option.value = item;
        dropdown.appendChild(option);
    });
}

// Function to populate tehsils dropdown based on selected district
function populateTehsils() {
    const selectedDistrict = document.getElementById('district').value;
    const tehsils = data.tehsils[selectedDistrict];
    populateDropdown(tehsils, 'tehsil');
}

// Function to populate police stations dropdown based on selected tehsil
function populatePoliceStations() {
    const selectedDistrict = document.getElementById('district').value;
    const selectedTehsil = document.getElementById('tehsil').value;
    const stations = data.stations[selectedDistrict][selectedTehsil];
    populateDropdown(stations, 'station');
}

// Event listeners for dropdown change events
document.getElementById('district').addEventListener('change', populateTehsils);
document.getElementById('tehsil').addEventListener('change', populatePoliceStations);

// Populate districts dropdown on page load
populateDropdown(data.districts.map(district => district.name), 'district');
