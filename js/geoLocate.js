function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

    var testDistances = [];


function showPosition(position) {
   
    testDistances[0] = position.coords.latitude;
    testDistances[1] = position.coords.longitude;
    
}

function getLocationArray(){
    return testDistances;
}