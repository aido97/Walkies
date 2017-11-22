//Calculates the desirability for every population dustrubution
function getDesirability() {   
for(var i = 0; i < populationDensity; i++){
    var distance = findTotalDistance(dogDist, population[i]);
    //Sets record to the shortest distance and bestOrder to the population that spwaned that distance
    if(distance < record){
        record = distance;
        bestOrder = population[i];
    }
    //Multiplies the distance to the power 12 to increase the difference between good distances and bad ones, making good ones a lot 
    //more likely as they will take up a much bigger percentage of the overally desirability, which is used to determine its probability.
    //Dividing by one inverts the number (because we want the smallest distance to be the most likely and therefore highest number)
    //Adding one is there incase the distance is ever 0 and we get a nasty error, not likely but better safe than sorry!
    desirability[i] = 1 / (Math.pow(distance, 12) + 1); 
    }
}

//Turns the desirability values into the percentage of the total desirability 
function normalizeDesirability() {
    //Adds up all of the desirability values
    var sum = 0;
    for(var i = 0; i < populationDensity; i++){
        sum = sum + desirability[i];
    }
    //Transforms each value into it's relevant percentage of the total desirability
    for(var i = 0; i < populationDensity; i++){
        desirability[i] = desirability[i] / sum;
    }
}

//Creates a cross over of two arrays of orders
function crossOver(orderA, orderB){
    //Generates a random start and end point, ensuring that the end is after the start. .slice makes it so we can go passed the 
    //last index of the order without getting an error.
    var start = Math.floor(Math.random() * orderA.length);
    var end = Math.floor((Math.random() * orderA.length) + (start + 1));
    var newOrder = orderA.slice(start, end);
    //Add all the elements in from B as long as they're not already in A
    for (var i = 0; i < orderB.length; i++){
        var dog = orderB[i];
        if(!newOrder.includes(dog)) {
            newOrder.push(dog);
        }
    }
    //Return the newly created order
    return newOrder;
}

//Creates the next generation of the population
function nextGeneration(){
    var newPopulation = [];
    for(var i = 0; i < population.length; i++){
        //Gets two of the best populations and then crosses them over 
        var orderA = pickOne(population, desirability); 
        var orderB = pickOne(population, desirability);   
        var order = crossOver(orderA, orderB);
        //Mutate at a rate of 8.5%      
        mutate(order, 0.085);
        newPopulation[i] = order; 
    }
    population = newPopulation;   
}

//Picks a random number from 0.0 - 1. Subtracts the desirability score (now percentage of total desirability remember) from the generated
//number. This results in the scores with the highest desirability score having the highest probability to trigger the switch from r > 0
//Each score has a chance of triggering r to become negative directly relational to it's desirability score.
function pickOne(list, desirability) {
    var index = 0;
    var r = Math.random(1);
    //While r is still a positive number, keep subtracting the next desirability index until it becomes negative
    while (r > 0) {
        r = r - desirability[index];
        index++;
      }
      //Compensates for the final unnecessary index increment, it was not this index that tipped us over the edge!
      index--;
    //Return the corresponding order from the successful desirability value
    return list[index].slice();
  }
  
  //Mutates a given order by a given % mutation rate
  function mutate(order, mutationRate) {
    for (var i = 0; i < totalDogs; i++) {
        //If a randomly generated number between 0.0 and 1 is less than the mutation rate i.e. in mutationRate % of cases this happens
        if (Math.random(1) < mutationRate) {
        //Swaps two random elements in the array
          var indexA = Math.floor(Math.random() * totalDogs);
          var indexB = (indexA + 1) % totalDogs;
          swap(order, indexA, indexB);
        }
      }
  }