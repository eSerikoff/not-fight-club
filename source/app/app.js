//проверка input на наличие текста, чтобы дизейблить кнопку Create
const welcomeInput = document.querySelector('.registerFormInput');
welcomeInput.addEventListener('input', (e) => {
    if (welcomeInput.value !== '')
        document.querySelector('.registerFormButton').disabled = false;
    else 
        document.querySelector('.registerFormButton').disabled = true;
})

//Клик по кнопке Create 
const registerFormButton = document.querySelector('.registerFormButton');
registerFormButton.addEventListener('click', (e) => {
    localStorage.setItem('playerName', welcomeInput.value);
    // document.querySelector('.welcome').classList.add('hidden');
    // document.querySelector('.fight').classList.remove('hidden');
})

// Проверка выбора чекбоксов
const base = document.querySelector('.fightFormContainer');
base.addEventListener('click', (e) => {
    countPlayerChecked = document.querySelectorAll('.playerChoise:checked');
    countEnemyChecked = document.querySelectorAll('.enemyChoise:checked');
    if (countPlayerChecked.length === 1 && countEnemyChecked.length === 2)
        document.querySelector('.buttonAttack').disabled = false;
    else 
        document.querySelector('.buttonAttack').disabled = true;
})







