var dogDist = [];
var dogLocations = [];
var distance = [];
var bestOrder = [];
var record = Number.MAX_SAFE_INTEGER;
var sum = 0;
var totalDogs;
var population = [];
var populationDensity = 500;
var desirability = [];
var chartBestRecords = [];

function getShortestRoute(dogs){
    //Sets the dogDist array to the passed in value and the total number of dogs / collection points
    //dogDist = dogs;
    
    //Run the create dogs function if you are calculating as the crow flies distance from long/lat to generate
    //the required 2d array of distances  
     dogLocations = dogs;
     createDogs(dogs);
    totalDogs = dogDist[0].length;
    
    initialSetup();
   
    //Produces the desired number of generations. For now having it equal the population 
  //density seems to work well. May be changed at a later date to a more optimal solution
  for(var i = 0; i < (totalDogs * 6); i++){
   getDesirability();
   normalizeDesirability();
   nextGeneration(); 

   //Logs the record and best order of each generation. Used only to demonstrate algorithm. Will be removed before release
   console.log(i);
   console.log(record);
   console.log(bestOrder);
   chartBestRecords[i] = [];
   chartBestRecords[i][0] = ("Generation " + i);
   chartBestRecords[i][1] = record * -1;
  }
  chartBestRecords.splice(0, 0, ["Generation", "Record in Meters"]);
  //Return the best found order when all the generations have completed
   return(bestOrder);
}

function initialSetup (){
    //Creates a default initial linear order - 0, 1, 2, 3..
    var order = [];
    for(var i = 0; i < totalDogs; i++){
        order[i] = i;
    }
   
   //Shuffles the linear order into the required amount of random arrays to initially fill our population with
   for (var i = 0; i < populationDensity; i++){
       population[i] = order.slice();
       sufflePop(population[i], 100);
   }
}

//Draws chart showing performance of algorithm by generation
function drawChart() {
    var data = google.visualization.arrayToDataTable(chartBestRecords);

    var options = {
      title: 'Algorithm Performance',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
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
    //Steps through the array of dogs and adds the distance between each point based on the order supplied
    var totalDistance = 0;
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
function sufflePop(pop, numTimes) {
  for (var i = 0; i < numTimes; i++) {
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
