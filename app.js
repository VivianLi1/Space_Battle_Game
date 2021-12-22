let player;
let enemyArray;
let battleCount;

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

    isDead(){
        return this.hull <= 0;
    }
}

window.onload = () => {
    toggleStartModal();
}

/* Modal Functions */
function toggleStartModal(){
    let modal = document.getElementById("startModal");
    let startButton = document.getElementById("startButton");

    modal.style.display = 'block';

    startButton.addEventListener('click', function(){
        modal.style.display = 'none';
        init();
    });
}

function toggleEndModal(msg, msg2){
    let modal = document.getElementById("endModal");
    let endButton = document.getElementById("endButton");
    let endText = document.getElementById("endText");
    let endText2 = document.getElementById("endText2");

    endText.innerText = msg;
    endText2.innerText = msg2;
    modal.style.display = 'block';

    endButton.addEventListener('click', function(){
        modal.style.display = 'none';
        toggleStartModal();
    });
}

function init(){

    player = generateUser(20, 5, 0.7);

    // Displays Player name based on user input
    const playerNameInput = document.getElementById('playerNameInput').value;
    chooseName(playerNameInput);

    // Generate array of enemies based on user input (default 6)
    let enemyCount = document.getElementById('enemyCountInput').value;
    if(enemyCount == ""){enemyCount = 6;}
    enemyArray = generateEnemyArray(enemyCount);

    // Initial display of ships and containers on DOM
    displayShip("player", player);
    displayShip("enemy", enemyArray[0]);
    document.getElementById('resultContainer').innerText = '';
    document.getElementById('resultContainer2').innerText = '';

    // Keeps track of what battle is executing
    battleCount = 0;
    // Displays curr enemy name
    document.getElementById('enemyName').innerText = `Enemy ${battleCount+1}`;

    // Add event listeners for attack and retreat buttons
    document.getElementById('attackButton').addEventListener('click', attackButtonListenerFunc);
    document.getElementById('retreatButton').addEventListener('click', retreatButtonListenerFunc);
}

function attackButtonListenerFunc(){
    let attackbutton = document.getElementById('attackButton');
    let result = document.getElementById('resultContainer');
    let result2 = document.getElementById('resultContainer2');
    result.innerHTML = ""
    result2.innerHTML = ""

    attackbutton.classList.add('pressed');
    result.classList.add('typewriter');
    result2.classList.add('typewriter');

    setTimeout(function(){
        let winBattle = battle(player, enemyArray[battleCount]);
        if(winBattle){
            battleCount++;
            console.log(battleCount)

            if(checkWinGame(battleCount)){
                document.getElementById('attackButton').removeEventListener('click', attackButtonListenerFunc);
                document.getElementById('retreatButton').removeEventListener('click', retreatButtonListenerFunc);
                setTimeout(function(){
                    toggleEndModal("You Win!", "You vanquished all the aliens!");
                }, 2100);
            }else{
                document.getElementById('enemyName').innerText = `Enemy ${battleCount+1}`;
                displayShip("enemy", enemyArray[battleCount]);
            }
        }

        attackbutton.classList.remove('pressed');

    }, 500);

    setTimeout(function(){
        result.classList.remove('typewriter');
        result2.classList.remove('typewriter');

    }, 2000);
}

function retreatButtonListenerFunc(){
    let retreatButton = document.getElementById('retreatButton');
    retreatButton.classList.add('pressed');
    setTimeout(function(){
        retreatButton.classList.remove('pressed');
        document.getElementById('attackButton').removeEventListener('click', attackButtonListenerFunc);
        document.getElementById('retreatButton').removeEventListener('click', retreatButtonListenerFunc);
        toggleEndModal("Game Over!", "You couldn't handle the heat and escaped!");
    }, 500);
}

function chooseName(playerName){
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


function battle(player, enemy){

    let result = document.getElementById('resultContainer');
    let result2 = document.getElementById('resultContainer2');

    if(!player.isDead() && !enemy.isDead()){
        let msg = player.attack(enemy);
        displayShip("player", player);
        displayShip("enemy", enemy);

        result.innerHTML = "Player attacks: " + msg;

        if(enemy.isDead()){
            result2.innerHTML = "You Killed the Enemy!";
            result2.classList.add('redText');
            return true;
        }
    }

    if(!enemy.isDead()){
        let msg = enemy.attack(player);
        displayShip("player", player);
        displayShip("enemy", enemy);

        result2.innerHTML = "Enemy attacks: " + msg;
        result2.classList.remove('redText');

        if(player.isDead()){
            document.getElementById('attackButton').removeEventListener('click', attackButtonListenerFunc);
            document.getElementById('retreatButton').removeEventListener('click', retreatButtonListenerFunc);
            setTimeout(function(){
                toggleEndModal("Game Over!", "You Died :(");
            }, 2100);
        }
    } 
}

function checkWinGame(battleCount){
    return battleCount > enemyArray.length-1;
}