class Traveler{
    constructor(name){
        this._name = name;
        this._food = 1;
        this._isHealthy = true

        Object.defineProperties(this, {
            name:{
                get: function(){
                    return this._name;
                },
                set: function(value){
                    return this._name = value;
                }
            },
            food:{
                get: function(){
                    return this._food;
                },
                set: function(value){
                    return this._food = value;
                }
            },
            isHealthy:{
                set: function(value){
                    return this._isHealthy = value;
                },
                get: function(){
                    return this._isHealthy;
                }
            }
        })
    }


    hunt(){
        this.food += 2;
    }

    eat(){
        if(this.food > 0){
            this.food -= 1;
        }else{
            this.isHealthy = false;
        }
    }
}


class Wagon{
    constructor(capacity){
        this.capacity = capacity;
        this.passageiros = [];
        this.getAvailableSeatCount();
    }

    getAvailableSeatCount(){
        let seatsOff = this.passageiros;

        let seats = this.capacity - seatsOff.length

        return seats
    }

    join(Traveler){
        if(this.passageiros.length < this.capacity){
            this.passageiros.push(Traveler);
        }
    }

    shouldQuarantine(){
        let sick = 0;

        for(let i = 0; i < this.passageiros.length; i++){
            if(this.passageiros[i]['isHealthy'] === false){
                sick++;
            }
        }

        if(sick > 0){
            return true 
        }else{
            return false
        }
    }

    totalFood(){
        const foodCount = (accumulated, obj) => {
            return accumulated += obj.food
        }

        let food = this.passageiros.reduce(foodCount, 0)

        return food
    }
}

// Criar uma carroça que comporta 2 pessoas
let wagon = new Wagon(2);
// Criar três viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let maude = new Traveler('Maude');
 
console.log(`${wagon.getAvailableSeatCount()} should be 2`);
 
wagon.join(henrietta);
console.log(`${wagon.getAvailableSeatCount()} should be 1`);
 
wagon.join(juan);
wagon.join(maude); // Não tem espaço para ela!
console.log(`${wagon.getAvailableSeatCount()} should be 0`);
 
henrietta.hunt(); // pega mais comida
juan.eat();
juan.eat(); // juan agora está com fome (doente)
 
console.log(`${wagon.shouldQuarantine()} should be true since juan is sick`);
console.log(`${wagon.totalFood()} should be 3`);