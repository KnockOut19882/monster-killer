const PLAYER_ATTACK_DMG = 10;
const MONSTER_ATTACK_DMG = 14;
const STRONG_ATTACK_DMG = 17;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackMonster(mode) {
	if (mode === PLAYER_ATTACK_DMG) {
		const damage = dealMonsterDamage(PLAYER_ATTACK_DMG);
		currentMonsterHealth -= damage;
		const monsterDamage = dealPlayerDamage(MONSTER_ATTACK_DMG);
		currentPlayerHealth -= monsterDamage;
	} else {
		const damage = dealMonsterDamage(STRONG_ATTACK_DMG);
		currentMonsterHealth -= damage;
		const monsterDamage = dealPlayerDamage(MONSTER_ATTACK_DMG);
		currentPlayerHealth -= monsterDamage;
	}
}

function attackHandler() {
	const damage = dealMonsterDamage(PLAYER_ATTACK_DMG);
	currentMonsterHealth -= damage;
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

function strongAttackHandler() {
	const damage = dealMonsterDamage(STRONG_ATTACK_DMG);
	currentMonsterHealth -= damage;
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

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
