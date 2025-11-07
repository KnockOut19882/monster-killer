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

const enteredLifeValue = prompt('Chose the player and monster life', '100');

let chosenMaxLife = parseInt(enteredLifeValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
	chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

function writeToLog(event, value, playerHealth, monsterHealth) {
	let logEntry;
	if (event === LOG_EVENT_PLAYER_ATTACK) {
		logEntry = {
			event: event,
			value: value,
			target: 'PLAYER',
			finalPlayerHealth: playerHealth,
			finalMonsterHealth: monsterHealth,
		};
		battleLog.push(logEntry);
	} else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
		logEntry = {
			event: event,
			value: value,
			target: 'PLAYER',
			finalPlayerHealth: playerHealth,
			finalMonsterHealth: monsterHealth,
		};
		battleLog.push(logEntry);
	} else if (event === LOG_EVENT_PLAYER_HEAL) {
		logEntry = {
			event: event,
			value: value,
			target: 'PLAYER',
			finalPlayerHealth: playerHealth,
			finalMonsterHealth: monsterHealth,
		};
		battleLog.push(logEntry);
	} else if (event === LOG_EVENT_MONSTER_ATTACK) {
		logEntry = {
			event: event,
			value: value,
			target: 'MONSTER',
			finalPlayerHealth: playerHealth,
			finalMonsterHealth: monsterHealth,
		};
		battleLog.push(logEntry);
	} else if (event === LOG_EVENT_GAME_OVER) {
		logEntry = {
			event: event,
			value: value,
			finalPlayerHealth: playerHealth,
			finalMonsterHealth: monsterHealth,
		};
		battleLog.push(logEntry);
	}
}

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
	0;

	if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
		reset();
	}
}

function attackMonster(mode) {
	let maxDamage;
	let logEvent;
	if (mode === MODE_ATTACK) {
		maxDamage = PLAYER_ATTACK_DMG;
		logEvent = LOG_EVENT_PLAYER_ATTACK;
	} else if (mode === MODE_STRONG_ATTACK) {
		maxDamage = STRONG_ATTACK_DMG;
		logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
	}
	const damage = dealMonsterDamage(maxDamage);
	currentMonsterHealth -= damage;
	writeToLog(logEvent, damage, currentPlayerHealth, currentMonsterHealth);
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
	writeToLog(
		LOG_EVENT_PLAYER_HEAL,
		healValue,
		currentPlayerHealth,
		currentMonsterHealth
	);
	endRound();
}

function showPreventLog() {
	console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', showPreventLog);
