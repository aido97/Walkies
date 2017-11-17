var dogs = [];
var totalDogs = 5;
var recordDistance;
var bestEver;


function setup() {

  //Define the canvas
  createCanvas(700, 575);

  //Generate a random vector position for each dog
  for (var i = 0; i < totalDogs ; i++){
    var vectorPoints = createVector(random(width), random(height));
    dogs[i] = vectorPoints;
  }

  //Find the distance between the initial arangement, sets it to best distance and arrangement, to be replaced later as we find better ones.
  var distance = findDistance(dogs);
  recordDistance = distance;
  bestEver = dogs.slice();

}

function draw() {

  //Sets the background to black and the circles (ellipses) to white
  background(0);
  fill(255);
  for (var i = 0; i < dogs.length; i++){
    ellipse(dogs[i].x, dogs[i].y, 8, 8);
  }

  //Defines the lines/paths
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();

  //Draw every dog on the map at their randomly generated vector point
  for (var i = 0; i < dogs.length; i++){
    vertex(dogs[i].x, dogs[i].y);
  }

  endShape();

  //Draws the best ever route in purple on the map
  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < dogs.length; i++){
    vertex(bestEver[i].x, bestEver[i].y);
  }

  endShape();

  //Creates two random numbers within the range of our array and swaps them
  var i = floor(random(dogs.length));
  var j = floor(random(dogs.length));
  swap(dogs, i, j)

  //Compute the distance of the new arrangement
  var distance = findDistance(dogs);

  //If the distance is less than the previous record, send a copy of the arrangement to the bestEver var and the distance to the recordDistance var
  if( distance < recordDistance) {
    recordDistance = distance;
    bestEver = dogs.slice();    
    console.log(recordDistance, bestEver);
    
  }

}



//Simple swap function
function swap(a, i, j){
  var tempVar = a[i]
  a[i] = a[j];
  a[j] = tempVar;
}

//Function to find the distance between points using p5 built in points functions
function findDistance(points){
  var sum = 0;
  for (var i = 0; i < points.length - 1; i++){
    var distance = dist(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
    sum = sum + distance;
  }
  return sum;
}