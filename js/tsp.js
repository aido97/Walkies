var dogDist = [];
var dogLocations = [[53.341665, -6.229011],[53.341865, -6.234095],[53.342455, -6.238445],[53.342769, -6.241259],[53.343419, -6.245457],[53.343975, -6.248218],[53.344692, -6.251832],[53.345019, -6.253731],[53.345332, -6.255222]];
var distance = [];
var bestOrder = [];
var record = 99999999;
var sum = 0;
var totalDogs;
var population = [];
var populationDensity = 99999;
var fitness = [];



function getShortestRoute(dogs){
    //Sets the initial order
    dogDist = dogs;
    totalDogs = dogDist[0].length;
    
    temp();
   
  //Algorithm functions
   getFitness();
   normalizeFitness();
   nextGeneration(); 
   

   return(bestOrder);
   console.log(bestOrder);
}

function temp (){
    var order = [];
    
    for(var i = 0; i < dogDist.length; i++){
        order[i] = i;
    }
   //createDogs();
   for (var i = 0; i < populationDensity; i++){
       population [i] = order.slice();
       sufflePop(population[i], 100);

   }
}

//Function to create a 2d array, each array element representing a dog's location and this distance between itself and every dog in the order, inclusively.
function createDogs(){
    //Temporary loop just to get the distance between each   
    for(var i = 0; i < dogLocations.length; i++){
       dogDist[i] = []        
        for(var j = 0; j < dogLocations.length; j++){
            dogDist[i][j] = latDist(dogLocations[i][0], dogLocations[i][1], dogLocations[j][0], dogLocations[j][1])
        }
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

//Simple shuffle function to mix around the population
function sufflePop(pop, num) {
  for (var i = 0; i < num; i++) {
    var indexA = Math.floor(Math.random() * pop.length);
    var indexB = Math.floor(Math.random() * pop.length);
    swap(pop, indexA, indexB);
  }
}

//Simple swap function
function swap (a, i, j){
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}
