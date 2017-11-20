
//Calculates the fitness for every population dustrubution
function getFitness() {
   for(var i = 0; i < population.length; i++){
    var distance = findTotalDistance(dogDist, population[i]);
    //Sets record to the shortest distance and bestOrder to the population that spwaned that distance
    if(distance < record){
        record = distance;
        bestOrder = population[i];
    }
    //Dividing by one makes it so that larger numbers become smaller, and smaller ones become larger 
    //+1 is there to stop bugs in case distance was ever 0, however that's very unlikely due to two points not being on top of each other. Better safe than sorry though!
    fitness[i] = 1 / (distance + 1);
    console.log(record);
    
}
}

function normalizeFitness() {
    var sum = 0;
    for(var i = 0; i < fitness.legnth; i++){
        sum = sum + fitness[i];
    }
    for(var i = 0; i < fitness.legnth; i++){
        fitness[i] = fitness[i] / sum;
    }
}

//Creates the next generation of the population
function nextGeneration(){
    var newPopulation = [];
    for(var i = 0; i < population.length; i++){
        var order = pickOne(population, fitness); 
        mutate(order);
        newPopulation[i] = order; 
    }
    population = newPopulation;
}

//Picks a number from 0.0 - 1 that represents 1-100% and chooses according to the corresponding fitness range 
function pickOne(list, fitness) {
    var index = 0;
    var r = Math.random(1);
  
    while (r > 0) {
      r = r - list[index].fitness;
      index++;
    }
    //To account for the last unnecessary increase in the loop
    index--;
    return list[index].slice();
  }
  
  //Mutates the given order
  function mutate(order, mutationRate) {
    var indexA = Math.floor(Math.random() * order.length);
    var indexB = Math.floor(Math.random() * order.length);   
    swap(order, indexA, indexB);
  }