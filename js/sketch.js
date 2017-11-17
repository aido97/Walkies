var dogs = [];
var totalDogs = 8;
var recordDistance;
var bestEver;
var order = [];
var totalPermuatations;
var count = 1;



function setup() {

  //Define the canvas
  createCanvas(700, 575);

  //Generate a random vector position for each dog in the top half of the vector
  for (var i = 0; i < totalDogs ; i++){
    var vectorPoints = createVector(random(width), random(height/2));
    dogs[i] = vectorPoints;
    order[i] = i;

  }

  //Find the distance between the initial arangement, sets it to best distance and arrangement, to be replaced later as we find better ones.
  var distance = findDistance(dogs, order);
  recordDistance = distance;
  bestEver = order.slice();

  //Find the total number of possible perumatations
  totalPermutations = factorial(totalDogs);
  console.log(totalPermutations);

}

function draw() {

  //Sets the background to black and the circles (ellipses) to white
  background(0);
  fill(255);
  for (var i = 0; i < dogs.length; i++){
    ellipse(dogs[i].x, dogs[i].y, 8, 8);
  }
  
  //Draws the best ever route in purple on the map
  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < order.length; i++){
    var n = bestEver[i];
    vertex(dogs[n].x, dogs[n].y);
  }

  endShape();

  //Draw every dog on the map at their randomly generated vector point
  stroke(255);
  translate(0, height/2);  
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < order.length; i++){
    var n = order[i];
    vertex(dogs[n].x, dogs[n].y);
  }

  endShape();

  //Compute the distance of the new arrangement
  var distance = findDistance(dogs, order);

  //If the distance is less than the previous record, send a copy of the arrangement to the bestEver var and the distance to the recordDistance var
  if( distance < recordDistance) {
    recordDistance = distance;
    bestEver = order.slice();    
    console.log(recordDistance, bestEver);
    
  }
  
  //Calculates the percentage complete
  var percent = 100 * (count / totalPermutations);

  //Writes text to the bottom of the vector
  textSize(32);
  // var s = '';
  // for (var i = 0; i < order.length; i++) {
  //   s += order[i];
  // }
  fill(255);
  text(nf(percent, 0, 2) + "% completed", 20, height / 2 - 50);


  nextOrder();

}



//Simple swap function
function swap(a, i, j){
  var tempVar = a[i]
  a[i] = a[j];
  a[j] = tempVar;
}

//Function to find the distance between points using p5 built in points functions
function findDistance(points, order){
  var sum = 0;

  for (var i = 0; i < order.length - 1; i++){
    var dogAIndex = order[i];
    var dogA = points[dogAIndex];
    var dogBIndex = order[i+1];
    var dogB = points[dogBIndex];
    var distance = dist(dogA.x, dogA.y, dogB.x, dogB.y);
    sum = sum + distance;
  }
  return sum;
}

//Lexical order function
function nextOrder(){

  count++;

  //Step 1 - find the largest item in the array that is less than the number to the right of it.
  var largestI = -1;
  for (var i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    noLoop();
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

function factorial(n){
  if(n == 1){
    return n;
  } else {
    return n * factorial(n - 1);
  }
}