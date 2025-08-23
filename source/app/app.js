//GLOBAL INITIALIZATION
let headerLogo = document.querySelector('.headerLogo');
let characterName = document.querySelectorAll('.characterName');
let parentFightCharacter = document.querySelector('.fightCharacter');
let parentCharacterInfoAvatar = document.querySelector('.characterInfo-avatar');
let characterWins = document.querySelector('.characterWins');
let characterLoses = document.querySelector('.characterLoses');
let characterSettingsName = document.querySelector('.characterSettings').querySelector('.characterName');

//проверка input на наличие текста, чтобы дизейблить кнопку Create
const welcomeInput = document.querySelector('.registerFormInput');
welcomeInput.addEventListener('input', (e) => {
    if (welcomeInput.value !== '')
        document.querySelector('.registerFormButton').disabled = false;
    else
        document.querySelector('.registerFormButton').disabled = true;
})


function UpdateCharacterName() {
    characterName.forEach(elem => {
        elem.textContent = localStorage.getItem('characterName');
    })
}
// Рандомный выбор противника
function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

// Randome emenies
const enemies = [
    {
        name: 'Troll',
        attack: 10,
        health: 100,
        avatar: 'source/img/EnemyAvatar/troll.jpg',
    },
    {
        name: 'Golem',
        attack: 7,
        health: 150,
        avatar: 'source/img/EnemyAvatar/golem.jpg',
    },
    {
        name: 'Warewolf',
        attack: 12,
        health: 120,
        avatar: 'source/img/EnemyAvatar/werewolf.jpg',
    }
]

//Аватарки персонажа
const characterAvatars = new Map([
    ['Avatar1', 'source/img/playerAvatar/berserk.jpg'],
    ['Avatar2', 'source/img/playerAvatar/man-crusader.jpg'],
    ['Avatar3', 'source/img/playerAvatar/woman-crusader.jpg'],
]);

//Клик по кнопке Create 
const registerFormButton = document.querySelector('.registerFormButton');
registerFormButton.addEventListener('click', (e) => {
    localStorage.setItem('characterName', welcomeInput.value);

    document.querySelector('.characterName').textContent = localStorage.getItem('characterName');
    document.querySelector('.characterAvatar').src = characterAvatars.get(localStorage.getItem('characterAvatar'));

    document.querySelector('.welcome').classList.add('hidden');
    document.querySelector('.characterInfo').classList.add('hidden');
    document.querySelector('.characterSettings').classList.add('hidden');
    document.querySelector('.header').classList.remove('hidden');
    document.querySelector('.fight').classList.remove('hidden');

    UpdateCharacterName();

    let randomeEnemy = randomInteger(0, 2);
    //Установка врага
    document.querySelector('.enemyName').textContent = enemies[randomeEnemy].name;
    document.querySelector('.enemyAvatar').src = enemies[randomeEnemy].avatar;
    document.querySelector('.enemyHealtsText').textContent = `${enemies[randomeEnemy].health} / ${enemies[randomeEnemy].health}`;
    document.querySelector('.progressEnemyHealth').value = enemies[randomeEnemy].health;
    document.querySelector('.progressEnemyHealth').max = enemies[randomeEnemy].health;
})

// Проверка выбора чекбоксов
const base = document.querySelector('.fightFormContainer');
base.addEventListener('click', (e) => {
    countCharacterChecked = document.querySelectorAll('.characterChoise:checked');
    countEnemyChecked = document.querySelectorAll('.enemyChoise:checked');
    if (countCharacterChecked.length === 1 && countEnemyChecked.length === 2)
        document.querySelector('.buttonAttack').disabled = false;
    else
        document.querySelector('.buttonAttack').disabled = true;
})

// Click on nav CharacterInfo
const characterInfo = document.querySelector('.navImgUser');
characterInfo.addEventListener('click', (e) => {
    document.querySelector('.fight').classList.add('hidden');
    document.querySelector('.characterSettings').classList.add('hidden');
    document.querySelector('.characterInfo').classList.remove('hidden');

    parentCharacterInfoAvatar.querySelector('.characterAvatar').src = characterAvatars.get(localStorage.getItem('characterAvatar'));
    headerLogo.textContent = 'Character Info';

    UpdateCharacterName();

})

//popup choosing avatar
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

    parentFightCharacter
        .querySelector('.characterAvatar')
        .src = characterAvatars.get(localStorage.getItem('characterAvatar'));

    parentCharacterInfoAvatar
        .querySelector('.characterAvatar')
        .src = characterAvatars.get(localStorage.getItem('characterAvatar'));

})

avatar2.addEventListener('click', (e) => {
    localStorage.setItem('characterAvatar', 'Avatar2');

    parentFightCharacter
        .querySelector('.characterAvatar')
        .src = characterAvatars.get(localStorage.getItem('characterAvatar'));

    parentCharacterInfoAvatar
        .querySelector('.characterAvatar')
        .src = characterAvatars.get(localStorage.getItem('characterAvatar'));

})

avatar3.addEventListener('click', (e) => {
    localStorage.setItem('characterAvatar', 'Avatar3');

    parentFightCharacter
        .querySelector('.characterAvatar')
        .src = characterAvatars.get(localStorage.getItem('characterAvatar'));

    parentCharacterInfoAvatar
        .querySelector('.characterAvatar')
        .src = characterAvatars.get(localStorage.getItem('characterAvatar'));

})

const parentcharacterAvatar = document.querySelector('.characterInfo-avatar');
parentcharacterAvatar.querySelector('.characterAvatar').addEventListener('click', (e) => {
    popupOverlay.style.display = 'block';
})

// Click on nav CharacterSettings
const characterSettings = document.querySelector('.navImgEdit');
characterSettings.addEventListener('click', (e) => {
    document.querySelector('.fight').classList.add('hidden');
    document.querySelector('.characterInfo').classList.add('hidden');
    document.querySelector('.characterSettings').classList.remove('hidden');

    parentCharacterInfoAvatar.querySelector('.characterAvatar').src = characterAvatars.get(localStorage.getItem('characterAvatar'));
    headerLogo.textContent = 'Settings';

})

// CharacterSettings press buttons
document.querySelector('.btnEdit').addEventListener('click', (e) => {
    characterSettingsName.classList.add('hidden');

    document.querySelector('.characterSettingsInput')
    .classList.remove('hidden');

    document.querySelector('.btnEdit')
    .classList.add('hidden');

    document.querySelector('.btnSave')
    .classList.remove('hidden');
    document.querySelector('.btnCancel')
    .classList.remove('hidden');

    document.querySelector('.characterSettingsInput').value = localStorage.getItem('characterName');
})

document.querySelector('.btnSave').addEventListener('click', (e) => {
    localStorage.setItem('characterName', document.querySelector('.characterSettingsInput').value);
    UpdateCharacterName();

    characterSettingsName.classList.remove('hidden');
    document.querySelector('.btnEdit')
    .classList.remove('hidden');
    document.querySelector('.characterSettingsInput')
    .classList.add('hidden');
    document.querySelector('.btnSave')
    .classList.add('hidden');
    document.querySelector('.btnCancel')
    .classList.add('hidden');
})

document.querySelector('.btnCancel').addEventListener('click', (e) => {
    
    characterSettingsName.classList.remove('hidden');
    document.querySelector('.btnEdit')
    .classList.remove('hidden');
    document.querySelector('.characterSettingsInput')
    .classList.add('hidden');
    document.querySelector('.btnSave')
    .classList.add('hidden');
    document.querySelector('.btnCancel')
    .classList.add('hidden');
})

//Click on nav Battle
const battlePage = document.querySelector('.navImgFight');
battlePage.addEventListener('click', (e) => {
    document.querySelector('.fight').classList.remove('hidden');
    document.querySelector('.characterSettings').classList.add('hidden');
    document.querySelector('.characterInfo').classList.add('hidden');

    headerLogo.textContent = 'Battle';
})