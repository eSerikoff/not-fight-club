let enemyHealth = +localStorage.getItem('enemyHealth');
let enemyName = localStorage.getItem('enemyName');

let characterHealth = +localStorage.getItem('characterHealth');
let characterWins = +localStorage.getItem('characterWins');
let characterLooses = +localStorage.getItem('characterLooses');


let dom_headerLogo = document.querySelector('.headerLogo');

let dom_characterNameAll = document.querySelectorAll('.characterName');
let dom_characterWins = document.querySelector('.characterWinsText');
let dom_characterLooses = document.querySelector('.characterLoosesText');
let dom_characterHealth = document.querySelector('.characterHealthText');
let dom_progressCharacterHealth = document.querySelector('.progressCharacterHealth');

let dom_enemyHealth = document.querySelector('.enemyHealthText');
let dom_progressEnemyHealth = document.querySelector('.progressEnemyHealth');

let enemyNumber = 0;
localStorage.setItem('isBattleActive', false);
let isBattleActive = localStorage.getItem('isBattleActive');
let characterAttackChecked = [];
let characterDefenceChecked = [];

// Рандомный выбор целого числа от min до max
function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
// Emenies
const enemies = [
    {
        name: 'Troll',
        health: 140,
        attack: 12,
        avatar: 'source/img/EnemyAvatar/troll.jpg',
        countAttackArea: 1,
        countDefenceArea: 2,
    },
    {
        name: 'Golem',
        health: 105,
        attack: 8,
        avatar: 'source/img/EnemyAvatar/golem.jpg',
        countAttackArea: 3,
        countDefenceArea: 0,
    },
    {
        name: 'Warewolf',
        health: 115,
        attack: 10,
        avatar: 'source/img/EnemyAvatar/werewolf.jpg',
        countAttackArea: 2,
        countDefenceArea: 1,
    }
]
// Аватарки персонажа
const characterAvatars = new Map([
    ['Avatar1', 'source/img/playerAvatar/berserk.jpg'],
    ['Avatar2', 'source/img/playerAvatar/man-crusader.jpg'],
    ['Avatar3', 'source/img/playerAvatar/woman-crusader.jpg'],
]);
// Обновление имени персонажа во всех местах
function UpdateCharacterName() {
    dom_characterNameAll.forEach(elem => {
        elem.textContent = localStorage.getItem('characterName');
    })
}
// Подгрузка выбранной аватарки во все места страницы
function LoadCharacterAvatar() {
    document.querySelector('.fightCharacter')
        .querySelector('.characterAvatar')
        .src = characterAvatars.get(localStorage.getItem('characterAvatar'));

    document.querySelector('.characterInfo-avatar')
        .querySelector('.characterAvatar')
        .src = characterAvatars.get(localStorage.getItem('characterAvatar'));
}

// Первая установка аватарки персонажа (инициализация)
function FirstLoadCharacterAvatar() {
    if (localStorage.getItem('characterAvatar') === null) {
        document.querySelector('.fightCharacter')
            .querySelector('.characterAvatar')
            .src = "source/img/playerAvatar/berserk.jpg";

        document.querySelector('.characterInfo-avatar')
            .querySelector('.characterAvatar')
            .src = "source/img/playerAvatar/berserk.jpg";
    } else {
        LoadCharacterAvatar();
    }
}
// Случайный неповторяющийся выбор противника
function NotRepeatEnemy() {
    temp = randomInteger(0, 2);
    while (+localStorage.getItem('enemyNumber') === temp)
        temp = randomInteger(0, 2);
    return temp;
}

enemyNumber = NotRepeatEnemy();

// Создание нового противника
function CreateNewEnemy(enemy) {
    localStorage.setItem('enemyNumber', enemy);
    localStorage.setItem('enemyName', enemies[enemy].name);
    localStorage.setItem('enemyHealth', enemies[enemy].health);

    document.querySelector('.enemyName').textContent = enemies[enemy].name;
    document.querySelector('.enemyAvatar').src = enemies[enemy].avatar;
    document.querySelector('.enemyHealthText').textContent = enemies[enemy].health;
    document.querySelector('.totalEnemyHealth').childNodes[1].textContent = ` / ${enemies[enemy].health}`;
    document.querySelector('.progressEnemyHealth').value = enemies[enemy].health;
    document.querySelector('.progressEnemyHealth').max = enemies[enemy].health;
}
// Отображение страницы в зависимости от того был ли уже зарегестрирован персонаж
document.addEventListener('DOMContentLoaded', (e) => {
    if (localStorage.getItem('characterName') === null) {
        document.querySelector('.welcome').classList.remove('hidden');
    } else {
        document.querySelector('.header').classList.remove('hidden');
        document.querySelector('.previewFight').classList.remove('hidden');
        UpdateCharacterName();
        FirstLoadCharacterAvatar();
    }
})
// Проверка input на наличие текста, чтобы дизейблить кнопку Create
const welcomeInput = document.querySelector('.registerFormInput');
welcomeInput.addEventListener('input', (e) => {
    if (welcomeInput.value !== '')
        document.querySelector('.registerFormButton').disabled = false;
    else
        document.querySelector('.registerFormButton').disabled = true;
})
// Клик по кнопке Create 
const registerFormButton = document.querySelector('.registerFormButton');
registerFormButton.addEventListener('click', (e) => {
    localStorage.setItem('characterName', welcomeInput.value);

    document.querySelector('.registerFormInput').value = '';

    UpdateCharacterName();
    FirstLoadCharacterAvatar();

    localStorage.setItem('characterWins', 0);
    localStorage.setItem('characterLooses', 0);

    document.querySelector('.welcome').classList.add('hidden');
    document.querySelector('.header').classList.remove('hidden');
    document.querySelector('.previewFight').classList.remove('hidden');
})
// Click on "Go Fight" button
const goFight = document.querySelector('.goFight');
goFight.addEventListener('click', (e) => {
    if (localStorage.getItem('isBattleActive') === 'true') {
        dom_progressCharacterHealth.value = localStorage.getItem('characterHealth');
        dom_characterHealth.textContent = localStorage.getItem('characterHealth');

        dom_enemyHealth.textContent = localStorage.getItem('enemyHealth');
        dom_progressEnemyHealth.value = localStorage.getItem('enemyHealth');
    } else {
        localStorage.setItem('characterHealth', 150);
        
        dom_characterHealth.textContent = '150';
        dom_progressCharacterHealth.value = 150;

        localStorage.setItem('isBattleActive', true);
        enemyNumber = NotRepeatEnemy();
        CreateNewEnemy(enemyNumber);
    }

    document.querySelector('.previewFight').classList.add('hidden');
    document.querySelector('.fight').classList.remove('hidden');

    dom_headerLogo.textContent = 'Battle';
})
// Проверка выбора чекбоксов для атаки и защиты персонажем
const base = document.querySelector('.fightFormContainer');
base.addEventListener('click', (e) => {
    countAttackChecked = document.querySelectorAll('.characterChoise:checked');
    countDefenceChecked = document.querySelectorAll('.enemyChoise:checked');
    if (countAttackChecked.length === 1 && countDefenceChecked.length === 2) {
        document.querySelector('.buttonAttack').disabled = false;

        characterAttackChecked = countAttackChecked;
        characterDefenceChecked = countDefenceChecked;
    }
    else
        document.querySelector('.buttonAttack').disabled = true;
})
// Click on nav "CharacterInfo"
const characterInfo = document.querySelector('.navImgUser');
characterInfo.addEventListener('click', (e) => {
    document.querySelector('.fight').classList.add('hidden');
    document.querySelector('.characterSettings').classList.add('hidden');
    document.querySelector('.previewFight').classList.add('hidden');

    document.querySelector('.characterInfo').classList.remove('hidden');

    document.querySelector('.characterInfo-avatar').querySelector('.characterAvatar').src = characterAvatars.get(localStorage.getItem('characterAvatar'));
    dom_headerLogo.textContent = 'Character Info';

    dom_characterWins.textContent = +localStorage.getItem('characterWins');
    dom_characterLooses.textContent = +localStorage.getItem('characterLooses');
    UpdateCharacterName();
    FirstLoadCharacterAvatar();
})
// popup choosing avatar
const popupOverlay = document.querySelector('.characterInfo-ChooseAvatarbox');
const popup = document.querySelector('.characterInfo-ChooseAvatar');

popupOverlay.addEventListener('click', (e) => {
    popupOverlay.style.display = 'none';
})

// выбор и установка аватарки
const avatar1 = document.querySelector('.Avatar1');
const avatar2 = document.querySelector('.Avatar2');
const avatar3 = document.querySelector('.Avatar3');

avatar1.addEventListener('click', (e) => {
    localStorage.setItem('characterAvatar', 'Avatar1');

    LoadCharacterAvatar();
})
avatar2.addEventListener('click', (e) => {
    localStorage.setItem('characterAvatar', 'Avatar2');

    LoadCharacterAvatar();
})
avatar3.addEventListener('click', (e) => {
    localStorage.setItem('characterAvatar', 'Avatar3');

    LoadCharacterAvatar();
})
const parentcharacterAvatar = document.querySelector('.characterInfo-avatar');
parentcharacterAvatar.querySelector('.characterAvatar').addEventListener('click', (e) => {
    popupOverlay.style.display = 'block';
})
// Click on nav "CharacterSettings"
const characterSettings = document.querySelector('.navImgEdit');
characterSettings.addEventListener('click', (e) => {
    document.querySelector('.fight').classList.add('hidden');
    document.querySelector('.characterInfo').classList.add('hidden');
    document.querySelector('.previewFight').classList.add('hidden');

    document.querySelector('.characterSettings').classList.remove('hidden');

    dom_headerLogo.textContent = 'Settings';
})
// Кнопка Edit
document.querySelector('.btnEdit').addEventListener('click', (e) => {

    document.querySelector('.characterSettingsGeneral')
        .querySelector('.characterName').classList.add('hidden');
    document.querySelector('.btnEdit').classList.add('hidden');

    document.querySelector('.characterSettingsInput').classList.remove('hidden');
    document.querySelector('.btnSave').classList.remove('hidden');
    document.querySelector('.btnCancel').classList.remove('hidden');

    document.querySelector('.characterSettingsInput').value = localStorage.getItem('characterName');
})
// Кнопка Save
document.querySelector('.btnSave').addEventListener('click', (e) => {
    localStorage.setItem('characterName', document.querySelector('.characterSettingsInput').value);
    UpdateCharacterName();

    document.querySelector('.characterSettingsInput')
        .classList.add('hidden');
    document.querySelector('.btnSave')
        .classList.add('hidden');
    document.querySelector('.btnCancel')
        .classList.add('hidden');

    document.querySelector('.characterSettingsGeneral').querySelector('.characterName').classList.remove('hidden');
    document.querySelector('.btnEdit')
        .classList.remove('hidden');
})
// Кнопка Cancel
document.querySelector('.btnCancel').addEventListener('click', (e) => {

    document.querySelector('.characterSettings').querySelector('.characterName').classList.remove('hidden');
    document.querySelector('.btnEdit')
        .classList.remove('hidden');
    document.querySelector('.characterSettingsInput')
        .classList.add('hidden');
    document.querySelector('.btnSave')
        .classList.add('hidden');
    document.querySelector('.btnCancel')
        .classList.add('hidden');
})
// Кнопка ResetAll
document.querySelector('.resetAll').addEventListener('click', (e) => {
    localStorage.clear();
    location.reload(true);
    localStorage.setItem('isBattleActive', false);

    document.querySelector('.welcome').classList.remove('hidden');

    document.querySelector('.header').classList.add('hidden');
    document.querySelector('.characterSettings').classList.add('hidden');
})
// Click on nav "Battle"
const battlePage = document.querySelector('.navImgFight');
battlePage.addEventListener('click', (e) => {
    document.querySelector('.characterSettings').classList.add('hidden');
    document.querySelector('.characterInfo').classList.add('hidden');
    document.querySelector('.fight').classList.add('hidden');

    document.querySelector('.previewFight').classList.remove('hidden');

    dom_headerLogo.textContent = 'Battle';
})



// ALL ABOUT FIGHT
const hitAreas = ['head', 'body', 'arms', 'legs'];
let enemyAttackArea = [];
let enemyDefenceArea = [];
let characterAttackArea = [];
let characterDefenceArea = [];

// Зоны атаки противника
function EnemyAttackArea() {
    let i = 0;
    enemyAttackArea = [];
    while ((i < enemies[enemyNumber].countAttackArea) && enemyAttackArea.length < enemies[enemyNumber].countAttackArea) {
        temp = randomInteger(0, 3);
        if (enemyAttackArea.includes(hitAreas[temp])) {
            continue;
        }
        else {
            enemyAttackArea.push(hitAreas[temp]);
            i++;
        }
    }
    addLogMessage(`Enemy's attack area: ${enemyAttackArea}`);
}
// Зоны защиты противника
function EnemyDefenseArea() {
    i = 0;
    enemyDefenceArea = [];
    while ((i < enemies[enemyNumber].countDefenceArea) && enemyDefenceArea.length < enemies[enemyNumber].countDefenceArea) {
        temp = randomInteger(0, 3);
        if (enemyDefenceArea.includes(hitAreas[temp])) {
            continue;
        }
        else {
            enemyDefenceArea.push(hitAreas[temp]);
            i++;
        }
    }
    addLogMessage(`Enemy's defense area: ${enemyDefenceArea}`);
}

// Атака
function StartAttack() {

    //атака игрока и защита противника
    if (!enemyDefenceArea.includes(characterAttackArea[0])) {
        enemyHealth = +localStorage.getItem('enemyHealth');
        enemyHealth -= 12;
        localStorage.setItem('enemyHealth', enemyHealth)
        dom_enemyHealth.textContent = enemyHealth;
        dom_progressEnemyHealth.value = enemyHealth;

        addLogMessage(`${localStorage.getItem('characterName')} hit ${localStorage.getItem('enemyName')} for 12 dmg.`);

    } else {
        addLogMessage(`${localStorage.getItem('enemyName')} blocked ${localStorage.getItem('characterName')} attack.`);

    }

    //атака противника и защита игрока
    let totalDmg = 0;
    let countAttacks = 0;
    let countDefense = 0;

    for (let i = 0; i < enemies[enemyNumber].countAttackArea; i++) {
        if (!characterDefenceArea.includes(enemyAttackArea[i])) {
            totalDmg += enemies[enemyNumber].attack;
            countAttacks++;
        } else {
            countDefense++;
        }
    }
    characterHealth = +localStorage.getItem('characterHealth');
    characterHealth -= totalDmg;
    localStorage.setItem('characterHealth', characterHealth)
    dom_characterHealth.textContent = characterHealth;
    dom_progressCharacterHealth.value = characterHealth;

    if (+localStorage.getItem('characterHealth') <= 0) {
        console.log(+localStorage.getItem('characterHealth'));

        characterLooses = +localStorage.getItem('characterLooses');
        characterLooses += 1;
        localStorage.setItem('characterLooses', characterLooses);
        document.querySelector('.buttonAttack').disabled = true;
        alert('You are Loose!');
        EndGame();
    }
    else if (+localStorage.getItem('enemyHealth') <= 0) {
        console.log(+localStorage.getItem('enemyHealth'));
        characterWins = parseInt(localStorage.getItem('characterWins'));
        characterWins += 1;
        localStorage.setItem('characterWins', characterWins);
        document.querySelector('.buttonAttack').disabled = true;
        alert('You are Win!');
        EndGame();
    }

    addLogMessage(`${localStorage.getItem('enemyName')} hit ${localStorage.getItem('characterName')} ${countAttacks} times and caused damage ${totalDmg}.`);
    addLogMessage(`${localStorage.getItem('characterName')} blocked from ${localStorage.getItem('enemyName')} ${countDefense} attacks.`);
}
function EndGame() {
    localStorage.setItem('isBattleActive', false);
    document.querySelector('.fight').classList.add('hidden');
    document.querySelector('.previewFight').classList.remove('hidden');

    document.querySelector('.fightLog').innerHTML = "";
    document.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
        checkbox.checked = false;
    });

}

//Click Attack button
document.querySelector('.buttonAttack').addEventListener('click', (e) => {
    // Места атаки и защиты персонажа
    characterAttackArea = [];
    characterDefenceArea = [];

    characterAttackArea.push(characterAttackChecked[0].value);
    characterDefenceArea.push(characterDefenceChecked[0].value);
    characterDefenceArea.push(characterDefenceChecked[1].value);

    addLogMessage(`${localStorage.getItem('characterName')}'s attack areas: ${characterAttackArea}`);
    addLogMessage(`${localStorage.getItem('characterName')}'s defense areas: ${characterDefenceArea}`);

    EnemyAttackArea();
    EnemyDefenseArea();


    StartAttack();
    addLogMessage('********************');
})

function addLogMessage(message) {
    const logContainer = document.querySelector('.fightLog');

    const newMessage = document.createElement('div');
    newMessage.textContent = message;
    logContainer.appendChild(newMessage);

    logContainer.scrollTop = logContainer.scrollHeight;
}
