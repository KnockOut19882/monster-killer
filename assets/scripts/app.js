const PLAYER_ATTACK_DMG = 10;
const MONSTER_ATTACK_DMG = 14;
const STRONG_ATTACK_DMG = 17;
const HEAL_PLAYER = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

function getMaxLife() {
	const enteredLifeValue = prompt('Chose the player and monster life', '100');

	const parsedValue = parseInt(enteredLifeValue);
	if (isNaN(parsedValue) || parsedValue <= 0) {
		throw { message: 'Invalid user input, not a number!' };
	}
	return parsedValue;
}

let chosenMaxLife;
try {
	chosenMaxLife = getMaxLife();
} catch (error) {
	console.log(error);
	chosenMaxLife = 100;
	alert('You entered something wrong, your life is 100!');
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

function writeToLog(event, value, playerHealth, monsterHealth) {
	let logEntry = {
		event: event,
		value: value,
		target: event === LOG_EVENT_MONSTER_ATTACK ? 'PLAYER' : 'MONSTER',
		finalPlayerHealth: playerHealth,
		finalMonsterHealth: monsterHealth,
	};
	battleLog.push(logEntry);
}

adjustHealthBars(chosenMaxLife);

function reset() {
	currentMonsterHealth = chosenMaxLife;
	currentPlayerHealth = chosenMaxLife;
	hasBonusLife = true;
	resetGame(chosenMaxLife);
	location.reload(); // Reload page to restore bonus life element
}

function endRound() {
	const initialPlayerHealth = currentPlayerHealth;
	const monsterDamage = dealPlayerDamage(MONSTER_ATTACK_DMG);
	currentPlayerHealth -= monsterDamage;

	writeToLog(
		LOG_EVENT_MONSTER_ATTACK,
		monsterDamage,
		currentPlayerHealth,
		currentMonsterHealth
	);

	if (currentPlayerHealth <= 0 && hasBonusLife) {
		hasBonusLife = false;
		removeBonusLife();
		currentPlayerHealth = initialPlayerHealth;
		setPlayerHealth(initialPlayerHealth);
		alert('You would be dead, but you have another chance!!!');
	}

	if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
		alert('You won');
		writeToLog(
			LOG_EVENT_GAME_OVER,
			'PLAYER WON',
			currentPlayerHealth,
			currentMonsterHealth
		);
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
		alert('You lose');
		writeToLog(
			LOG_EVENT_GAME_OVER,
			'MONSTER WON',
			currentPlayerHealth,
			currentMonsterHealth
		);
	} else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
		alert("It's a DRAW");
		writeToLog(
			LOG_EVENT_GAME_OVER,
			'A DRAW',
			currentPlayerHealth,
			currentMonsterHealth
		);
	}

	if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
		reset();
	}
}

function attackMonster(mode) {
	let maxDamage =
		mode === MODE_ATTACK ? PLAYER_ATTACK_DMG : STRONG_ATTACK_DMG;
	let logEvent =
		mode === MODE_ATTACK
			? LOG_EVENT_PLAYER_ATTACK
			: LOG_EVENT_PLAYER_STRONG_ATTACK;
	// if (mode === MODE_ATTACK) {
	// 	maxDamage = PLAYER_ATTACK_DMG;
	// 	logEvent = LOG_EVENT_PLAYER_ATTACK;
	// } else if (mode === MODE_STRONG_ATTACK) {
	// 	maxDamage = STRONG_ATTACK_DMG;
	// 	logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
	// }
	const damage = dealMonsterDamage(maxDamage);
	currentMonsterHealth -= damage;
	endRound();
	writeToLog(logEvent, damage, currentPlayerHealth, currentMonsterHealth);
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
	writeToLog(
		LOG_EVENT_PLAYER_HEAL,
		healValue,
		currentPlayerHealth,
		currentMonsterHealth
	);
	endRound();
}

function showPreventLog() {
	for (let i = 0; i < 3; i++) {
		console.log('---------');
	}
	// let j = 0;
	// while (j < 3) {
	// 	console.log('J:', j);
	// 	j++;
	// }
	// do {
	// 	console.log('J:', j);
	// 	j++;
	// } while (j <= 3);
	// for (let i = 0; i < battleLog.length; i++) {
	// 	console.log(battleLog[i]);
	// }
	let i = 0;
	for (const logEntry of battleLog) {
		console.log(`#${i}`);
		for (const key in logEntry) {
			// console.log(key);
			// console.log(logEntry[key]);
			console.log(`${key} => ${logEntry[key]}`);
		}
		i++;
	}
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', showPreventLog);
