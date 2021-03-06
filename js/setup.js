'use strict';
var WIZARDS_COUNT = 4;// Сколько у нас всего волшебников
var userDialog = document.querySelector('.setup');

userDialog.classList.remove('hidden');

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
