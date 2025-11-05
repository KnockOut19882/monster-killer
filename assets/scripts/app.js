const PLAYER_ATTACK_DMG = 10;
const MONSTER_ATTACK_DMG = 14;
const STRONG_ATTACK_DMG = 17;
const HEAL_PLAYER = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function endRound() {
	const monsterDamage = dealPlayerDamage(MONSTER_ATTACK_DMG);
	currentPlayerHealth -= monsterDamage;
	if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
		alert('You won');
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
		alert('You lose');
	} else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
		alert("It's a DRAW");
	}
}

function attackMonster(mode) {
	let maxDamage;
	if (mode === 'ATTACK') {
		maxDamage = PLAYER_ATTACK_DMG;
	} else {
		maxDamage = STRONG_ATTACK_DMG;
	}
	const damage = dealMonsterDamage(maxDamage);
	currentMonsterHealth -= damage;
	endRound();
}

function attackHandler() {
	attackMonster(PLAYER_ATTACK_DMG);
}

function strongAttackHandler() {
	attackMonster(STRONG_ATTACK_DMG);
}

function healPlayerHandler() {
	let healValue;
	if (currentPlayerHealth >= chosenMaxLife - HEAL_PLAYER) {
		alert("You can't heal to more than you max initial life");
		healValue = chosenMaxLife - currentPlayerHealth;
	} else {
		healValue = HEAL_PLAYER;
	}
	increasePlayerHealth(healValue);
	currentPlayerHealth += healValue;
	endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
