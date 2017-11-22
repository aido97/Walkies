var dogDist = [];
var dogLocations = [[53.341665, -6.229011],[53.341865, -6.234095],[53.342455, -6.238445],[53.342769, -6.241259],[53.343419, -6.245457],[53.343975, -6.248218],[53.344692, -6.251832],[53.345019, -6.253731],[53.345332, -6.255222]];
var distance = [];
var bestOrder = [];
var record = Number.MAX_SAFE_INTEGER;
var sum = 0;
var totalDogs;
var population = [];
var populationDensity = 500;
var desirability = [];



function getShortestRoute(dogs){
    //Sets the dogDist array to the passed in value and the total number of dogs / collection points
    dogDist = dogs;
    totalDogs = dogDist[0].length;
    
    //These were put into a temporary function and called here, rather than just being here 
    //themselves for debugging purposes. Will be removed before final release
    temp();
   
  //Produces the desired number of generations. For now having it equal the population 
  //density seems to work well. May be changed at a later date to a more optimal solution
  for(var i = 0; i < totalDogs; i++){
   getDesirability();
   normalizeDesirability();
   nextGeneration(); 

   //Logs the record and best order of each generation. Used only to demonstrate algorithm. Will be removed before release
   console.log(i);
   console.log(record);
   console.log(bestOrder);
  }
  //Return the best found order when all the generations have completed
   return(bestOrder);
}


function temp (){
    //Creates a default initial linear order - 0, 1, 2, 3..
    var order = [];
    for(var i = 0; i < totalDogs; i++){
        order[i] = i;
    }
    //Run the create dogs function if you are calculating as the crow flies distance from long/lat to generate
    //the required 2d array of distances
   //createDogs();
   //Shuffles the linear order into the required amount of random arrays to initially fill our population with
   for (var i = 0; i < populationDensity; i++){
       population[i] = order.slice();
       sufflePop(population[i], 100);
   }
}

//Function to create a 2d array, each array element representing a dog's location using Lat/Long (as the crow flies)
//and this distance between itself and every dog in the order, inclusively.
function createDogs(){
    for(var i = 0; i < dogLocations.length; i++){
       dogDist[i] = [];      
        for(var j = 0; j < dogLocations.length; j++){
            dogDist[i][j] = latDist(dogLocations[i][0], dogLocations[i][1], dogLocations[j][0], dogLocations[j][1])
        }
    }
}


//Finds the total distance of a given order
function findTotalDistance(dogs, order){
    var totalDistance = 0;
    //Steps through the array of dogs and adds the distance between each point based on the order supplied
    for (var i = 0; i < totalDogs - 1; i++){
        var dogIndexA = order[i];
        var dogIndexB = order[i+1];
        dogLocationA = Number(dogs[dogIndexA][dogIndexA]);
        dogLocationB = Number(dogs[dogIndexB][dogIndexA]);
        var distance = dogLocationA + dogLocationB;
        totalDistance = totalDistance + distance;
    }
    //Return the total distance
    return totalDistance;
}

//Credit to http://www.movable-type.co.uk/scripts/latlong.html for the algorithm, slightly modified to fit our purposes
//Find the distance between two points given their lognitudinal and latitudinal coordinates
function latDist(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
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
