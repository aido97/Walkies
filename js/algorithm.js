
//Calculates the fitness for every population dustrubution
function getFitness() {
var currentRecord = 999999;    
   for(var i = 0; i < population.length; i++){
    var distance = findTotalDistance(dogDist, population[i]);
    //Sets record to the shortest distance and bestOrder to the population that spwaned that distance
    if(distance < record){
        record = distance;
        bestOrder = population[i];
    }
    if (distance < currentRecord) {
        currentRecord = distance;
        currentBest = population[i];
      }
    //Dividing by one makes it so that larger numbers become smaller, and smaller ones become larger. This is because we want to give the smallest distance the largest fitness
    //+1 is there to stop bugs in case distance was ever 0, however that's very unlikely due to two points not being on top of each other. Better safe than sorry though!
    fitness[i] = 1 / (Math.pow(distance, 8) + 1);
    
    console.log(record);
    
}
}

function normalizeFitness() {
    var sum = 0;
    for(var i = 0; i < fitness.length; i++){
        sum = sum + fitness[i];
    }
    for(var i = 0; i < fitness.length; i++){
        fitness[i] = fitness[i] / sum;
    }
}

function crossOver(orderA, orderB){

    var start = Math.floor(Math.random() * orderA.length);
    var end = Math.floor((Math.random() * orderA.length) + (start + 1));
    var newOrder = orderA.slice(start, end);

    //var left = dogDist.length -newOrder.length;
    for (var i = 0; i < orderB.length; i++){
        var dog = orderB[i];
        if(!newOrder.includes(dog)) {
            newOrder.push(dog);
        }
    }
    return newOrder;
}

//Creates the next generation of the population
function nextGeneration(){
    var newPopulation = [];
    for(var i = 0; i < population.length; i++){
        var orderA = pickOne(population, fitness); 
        var orderB = pickOne(population, fitness);   
        var order = crossOver(orderA, orderB);      
        mutate(order, 0.01);
        newPopulation[i] = order; 
    }
    population = newPopulation;
    
}

//Picks a number from 0.0 - 1 that represents 1-100% and chooses according to the corresponding fitness range 
function pickOne(list, fitness) {
    var index = 0;
    var r = Math.random(1);
    while (r > 0) {
        r = r - fitness[index];
        index++;
      }
      index--;
    
    r = r - fitness[index];
    return list[index].slice();
  }
  
  //Mutates the given order
  function mutate(order, mutationRate) {
    for (var i = 0; i < totalDogs; i++) {
        if (Math.random(1) < mutationRate) {
          var indexA = Math.floor(Math.random(order.length));
          var indexB = (indexA + 1) % totalDogs;
          swap(order, indexA, indexB);
        }
      }
  }