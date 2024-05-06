// Data for districts, tehsils, and police stations
const data = {
    "districts": [
        {
            "name": "Kupwara",
            // "tehsils": ["Kupwara", "Handwara", "Langate", "Tangdar", "Lolab", "Sogam"]
        },
        {
            "name": "Pulwama",
            "tehsils": 
        },
        {
            "name": "Shopian",
            "tehsils": 
        },
        {
            "name": "Srinagar",
            // "tehsils": ["Srinagar", "Badgam", "Ganderbal", "Beerwah", "Chadoora"]
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
            "Kupwara": ["Police Station Kupwara"],
            "Handwara": ["Police Station Handwara"],
            "Langate": ["Police Station Langate"],
            "Tangdar": ["Police Station Tangdar"],
            "Lolab": ["Police Station Lolab"],
            "Sogam": ["Police Station Sogam"]
        },
        "Pulwama": {
            "Pulwama": ["Police Station Pulwama"],
            "Awantipora": ["Police Station Awantipora"],
            "Tral": ["Police Station Tral"],
            "Pampore": ["Police Station Pampore"],
            "Rajpora": ["Police Station Rajpora"]
        },
        "Shopian": {
            "Shopian": ["Police Station Shopian"],
            "Keller": ["Police Station Keller"],
            "Zainapora": ["Police Station Zainapora"],
            "Wachi": ["Police Station Wachi"]
        },
        "Srinagar": {
            "Srinagar": ["Police Station Srinagar"],
            "Badgam": ["Police Station Badgam"],
            "Ganderbal": ["Police Station Ganderbal"],
            "Beerwah": ["Police Station Beerwah"],
            "Chadoora": ["Police Station Chadoora"]
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
