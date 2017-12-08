function getWalkerLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

    var testWalkerDistances = [];


function showWalkerPosition(position) {
   
    testWalkerDistances[0] = position.coords.latitude;
    testWalkerDistances[1] = position.coords.longitude;
    
}

function getWalkerLocationArray(){
    return testWalkerDistances;
}