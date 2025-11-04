const PLAYER_ATTACK_DMG = 10;
const MONSTER_ATTACK_DMG = 14;

let chosenMaxLife = 5;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler () {
    const damage = dealMonsterDamage(PLAYER_ATTACK_DMG);
    currentMonsterHealth -= damage;
    const monsterDamage = dealPlayerDamage(MONSTER_ATTACK_DMG);
    currentPlayerHealth -= monsterDamage
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lose');
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("It's a DRAW");
    }
}

attackBtn.addEventListener('click', attackHandler);