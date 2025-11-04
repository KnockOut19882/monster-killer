const ATTACK_DMG = 10;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;git 
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler () {
    const damage = dealMonsterDamage(ATTACK_DMG);
    currentMonsterHealth -= damage;
}

attackBtn.addEventListener('click', attackHandler);