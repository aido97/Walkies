var dogLocations = [[53.3418617, -6.2277884], [53.3391460, -6.2231033], [53.3418617, -6.2277884], [53.3358086, -6.2218854]];
var dogDist = [];
var distance = [];
var order = [];
var factorialNum;
var bestOrder = [];
var record = 99999999;
var sum = 0;


function initialSetup(){
    //Sets the initial order
    for(var i = 0; i < dogLocations.length; i++){
        order[i] = i;
    }    
   findWalkingDistance();
   findBestDistance();
    //console.log(findTotalDistance(dogDist, order));
    
}

//Temporary function to populate the distances between each dog and every other (inclusive of itself) this will be removed for final version as these values will simply be passed in
function findWalkingDistance(){
    //Temporary loop just to get the distance between each   
    for(var i = 0; i < dogLocations.length; i++){
       dogDist[i] = []        
        for(var j = 0; j < dogLocations.length; j++){
            dogDist[i][j] = latDist(dogLocations[i][0], dogLocations[i][1], dogLocations[j][0], dogLocations[j][1])
        }
    }
}

//Finds the best distance from all possible orders
function findBestDistance(){
    //Finds the factorial value of the amount of dogs and iterates through each possible route
    factorialNum = getFactorial(dogLocations.length);
    for(var i = 0; i < factorialNum; i++){
        var current = findTotalDistance(dogDist, order);
        //If the current distance is less than the previous record best, set the record to the current value and the best order to the current order
        if (current < record || record == 99999999){
            record = current;
            bestOrder = order.slice();
        }
        nextOrder();
    }
}

//Finds the total distance of a given order
function findTotalDistance(points, order){
    var sum = 0;
    //Linearly add the distances of every element in this order and return the value
    for (var i = 0; i < order.length - 1; i++){
        var dogIndexA = order[i];
        var dogIndexB = order[i+1];
        dogLocationA = Number(points[dogIndexA][dogIndexA]);
        dogLocationB = Number(points[dogIndexB][dogIndexA]);
        var distance = dogLocationA + dogLocationB;
        sum = sum + distance;
    }
    return sum;
}

// //Finds the total distance of a given order
// function findTotalDistance(points, order){
//     var sum = 0;
//     //Linearly add the distances of every element in this order and return the value
//     for (var i = 0; i < order.length - 1; i++){
//         var dogAIndex = order[i];
//         var dogBIndex = order[i+1];
//         var distance = latDist(points[dogAIndex][0], points[dogAIndex][1], points[dogBIndex][0], points[dogBIndex][1]);
//         sum = sum + distance;
//     }
//     return sum;
// }

//Credit to http://www.movable-type.co.uk/scripts/latlong.html for the algorithm, slightly modified to fit our purposes
//Find the distance between two points given their lognitudinal and latitudinal coordinates
function latDist(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c * 1000; // Distance in meters
    return d;
}

//Converts degrees to radians
function deg2rad(deg) {
    return deg * (Math.PI/180)
}

//Credit to https://github.com/CodingTrain/Rainbow-Code/blob/master/CodingChallenges/CC_35_TSP/CC_35.3_TSP_Lexical/sketch.js for the algorithm
//Lexical order function
function nextOrder(){
    //Step 1 - find the largest item in the array that is less than the number to the right of it.
    var largestI = -1;
    for (var i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
        largestI = i;
    }
    }
    if (largestI == -1) {
    console.log('finished');
    }
    // STEP 2 - find item the biggest item larger than j
    var largestJ = -1;
    for (var j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
        largestJ = j;
    }
    }
    // STEP 3 - swaps the two found items in the array
    swap(order, largestI, largestJ);
    // STEP 4: reverse from largestI + 1 to the end
    var endArray = order.splice(largestI + 1);
    endArray.reverse();
    order = order.concat(endArray);
}

//Simple swap method
function swap(a, i, j){
    var tempVar = a[i]
    a[i] = a[j];
    a[j] = tempVar;
    }

//Simple recursive factorial method
function getFactorial(n){
    if(n == 0 || n == 1){
        return n;
    } else {
        return n * getFactorial(n - 1);
    }
}