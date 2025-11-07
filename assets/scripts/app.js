const PLAYER_ATTACK_DMG = 10;
const MONSTER_ATTACK_DMG = 14;
const STRONG_ATTACK_DMG = 17;
const HEAL_PLAYER = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset() {
	currentMonsterHealth = chosenMaxLife;
	currentPlayerHealth = chosenMaxLife;
	resetGame(chosenMaxLife);
}

function endRound() {
	const initialPlayerHealth = currentPlayerHealth;
	const monsterDamage = dealPlayerDamage(MONSTER_ATTACK_DMG);
	currentPlayerHealth -= monsterDamage;

	if (currentPlayerHealth <= 0 && hasBonusLife) {
		hasBonusLife = false;
		removeBonusLife();
		currentPlayerHealth = initialPlayerHealth;
		setPlayerHealth(initialPlayerHealth);
		alert('You would be dead, but you have another chance!!!');
	}

	if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
		alert('You won');
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
		alert('You lose');
	} else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
		alert("It's a DRAW");
	}

	if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
		reset();
	}
}

function attackMonster(mode) {
	let maxDamage;
	if (mode === 'ATTACK') {
		maxDamage = PLAYER_ATTACK_DMG;
	} else if (mode === 'STRONG_ATTACK') {
		maxDamage = STRONG_ATTACK_DMG;
	}
	const damage = dealMonsterDamage(maxDamage);
	currentMonsterHealth -= damage;
	endRound();
}

function attackHandler() {
	attackMonster('ATTACK');
}

function strongAttackHandler() {
	attackMonster('STRONG_ATTACK');
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
