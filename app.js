window.onload = () => {
    init();
}

class Ship{
    constructor(hull, firepower, accuracy){
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }

    attack(enemy){
        let hitChance = Math.random();
        if(hitChance < this.accuracy){
            enemy.takesDamage(this.firepower);
            return "Hit!"
        }

        return "Miss!"
    }   

    takesDamage(damage){
        this.hull -= damage;
    }
}

function init(){
    const player = generateUser(20, 5, 0.7);
    const enemyArray = generateEnemyArray(6);

    chooseName();
    displayShip("player", player);
    displayShip("enemy", enemyArray[0]);

}

function chooseName(){
    const playerName = prompt("Choose your ship name (or leave blank for default name)");
    if(playerName != "" && playerName != null) 
        document.getElementById('playerName').innerHTML = playerName;
}


function generateUser(hull, firepower, accuracy){
    return new Ship(hull, firepower, accuracy);
}

function generateEnemy(){
    const hull = Math.floor(Math.random() * 4) + 3;
    const firepower = Math.floor(Math.random() * 3) + 2;
    const accuracy = (Math.floor(Math.random() * 3) + 6) /10;

    const enemy = new Ship(hull, firepower, accuracy);

    return enemy;
}

function generateEnemyArray(length){
    const enemyArray = [];
    for(let i = 0; i < length; i++){
        enemyArray.push(generateEnemy());
    }

    return enemyArray;
}

function displayShip(shipId, ship){
    document.getElementById(`${shipId}Hull`).innerText =  ship.hull;
    document.getElementById(`${shipId}FirePower`).innerText =  ship.firepower;
    document.getElementById(`${shipId}Accuracy`).innerText =  ship.accuracy;
}

function attack(){
    
}

