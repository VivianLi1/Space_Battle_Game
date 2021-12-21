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

module.exports = Ship;