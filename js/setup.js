'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARDS_COUNT = 4;// Сколько у нас всего волшебников
var giveMeRandom = function (min, max) {
  max++;
  return Math.floor(Math.random() * (max - min) + min);
};
var wizardsData = {
  getName: function () {
    var randomNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
    return randomNames[giveMeRandom(0, 7)];
  },
  getSurname: function () {
    var randomSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
    return randomSurnames[giveMeRandom(0, 7)];
  },
  getCoatColor: function () {
    var randomCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
    return randomCoatColors[giveMeRandom(0, 5)];
  },
  getEyesColor: function () {
    var randomEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
    return randomEyesColors[giveMeRandom(0, 4)];
  },
  getFireballColor: function () {
    var randomFireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
    return randomFireballColors[giveMeRandom(0, 4)];
  }
};
var giveRandomWizard = function () {
  return {
    name: wizardsData.getName() + ' ' + wizardsData.getSurname(),
    coatColor: wizardsData.getCoatColor(),
    eyesColor: wizardsData.getEyesColor()
  };
};
var allWizards = [];

// Заполняем массив слуйчайными волшебниками
for (var i = 0; i < WIZARDS_COUNT; i++) {
  allWizards.push(giveRandomWizard());
}

//  Создадим функцию, которая будет отдавать готовый фрагмент с волшебниками на основе массива этих волшебников.
var giveResultFragment = function (wizzardArray) {
  // Находим шаблон волшебника и непосредственно тот div, в котором волшебник описывается
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
  // Создадим фрагмент, в который вставятся все волшебники
  var fragmentForAllWizards = document.createDocumentFragment();

  // Ну и погнали наполнять волшебников в фрагменте)
  for (var j = 0; j < WIZARDS_COUNT; j++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizzardArray[j].name;
    wizardElement.querySelector('.wizard-coat').setAttribute('fill', wizzardArray[j].coatColor);
    wizardElement.querySelector('.wizard-eyes').setAttribute('fill', wizzardArray[j].eyesColor);
    // Готового волшебника вставим в фрагмент
    fragmentForAllWizards.appendChild(wizardElement);
  }
  return fragmentForAllWizards;
};
// И теперь вставляем наш фрагмент в итоговую разметку
// Сначала Находим блок, куда вставлять волшебников
var similarListElement = document.querySelector('.setup-similar-list');
// Потом вставляем)
similarListElement.appendChild(giveResultFragment(allWizards));
//  И нужно же сделать блок видимым, чтобы было видно, что мы рисовали)
document.querySelector('.setup-similar').classList.remove('hidden');

var setup = document.querySelector('.setup');// Окно с настройками персонажа
var setupOpen = document.querySelector('.setup-open');// аватар пользователя в верхнем правом углу
var setupClose = setup.querySelector('.setup-close');// кнопка закрытия модального окна с настройками
var userNameInput = setup.querySelector('.setup-user-name');// input с именем персонажа
// Две функции ниже открывают и закрывают модалку с настройками персонажа
var openPopup = function () {
  setup.classList.remove('hidden');
  // Если окно открыли, его нужно будет когда-то закрывать. Добавим обработчик, чтобы можно было закрыть его с клавиатуры
  document.addEventListener('keydown', onPopupEscPress);
  wizardEyes.addEventListener('click', changeEyesColor);
  fireballColor.addEventListener('click', changeFireballColor);
};
var closePopup = function () {
  setup.classList.add('hidden');
  // И раз окно закрыто, то слушать событие, которое его должно закрывать - не нужно
  document.removeEventListener('keydown', onPopupEscPress);
  wizardEyes.removeEventListener('click', changeEyesColor);
  fireballColor.removeEventListener('click', changeFireballColor);
};
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== userNameInput) {
    closePopup();
  }
};

// Обработчики по клику на аватар
setupOpen.addEventListener('click', openPopup);
// Обработчик, чтобы модалка открывалась с клавиатуры по Enter, если в фокусе крестик
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});
// По клику на крестик закрытия модалки, закрывается окно настроек персонажа
setupClose.addEventListener('click', closePopup);
// Обработчик, чтобы модалка закрывалась с клавиатуры по Enter, если в фокусе крестик
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});
// Меняем цвет глаз персонажа по клику на них
var eyesColorInput = document.querySelector('input[name=eyes-color]');
var changeEyesColor = function () {
  var eyesColorNow = wizardsData.getEyesColor();
  wizardEyes.setAttribute('fill', eyesColorNow);
  eyesColorInput.value = eyesColorNow;
};
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');

wizardEyes.addEventListener('click', changeEyesColor);

// Меняем цвет фаерболов по клику на них
var fireballColor = document.querySelector('.setup-fireball-wrap');
var fireballColorInput = document.querySelector('input[name=fireball-color]');
var changeFireballColor = function () {
  var fireballColorNow = wizardsData.getFireballColor();
  fireballColor.style.background = fireballColorNow;
  fireballColorInput.value = fireballColorNow;
};

fireballColor.addEventListener('click', changeFireballColor);
