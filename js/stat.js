'use strict'
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var CLOUD_PADDING = 30;
var TEXT_X = CLOUD_X + CLOUD_PADDING;
var TEXT_Y = CLOUD_Y + CLOUD_PADDING;
var TEXT_LINE_HEIGHT = 1.5;
var TEXT_FONT = '16px PT Mono';
var TEXT_HEIGHT = 16;
var G_BODY_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_MARGIN = 50;
var getMaxElement = function(arr) {
  if (arr.length) {
    var maxElement = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  }
};
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
window.renderStatistics = function (ctx, names, times){
  var winnerPoints = Math.round(getMaxElement(times));

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.fillStyle = '#000';
  ctx.font = TEXT_FONT;
  ctx.fillText('Ура вы победили!', TEXT_X, TEXT_Y);
  ctx.fillText('Список результатов:',  TEXT_X, TEXT_Y * TEXT_LINE_HEIGHT);
  for (var i = 0; i < names.length; i++) {
    var xBarCoordinate = CLOUD_X + CLOUD_PADDING + (BAR_WIDTH + BAR_MARGIN) * i;
    ctx.font = TEXT_FONT;
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], xBarCoordinate, CLOUD_HEIGHT - CLOUD_Y);
    var coefficient = Math.round(times[i]) / winnerPoints;
    var barHeight = G_BODY_HEIGHT * coefficient;
    if (names[i] !== 'Вы'){
      var randomBlueRange = Math.floor(Math.random() * 266);
      var randomBlueColor = 'rgba(0, 0, ' + randomBlueRange + ', 1';
      ctx.fillStyle = randomBlueColor;
    } else {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(xBarCoordinate, CLOUD_HEIGHT - barHeight - CLOUD_Y - TEXT_HEIGHT, BAR_WIDTH, barHeight);
    ctx.font = TEXT_FONT;
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), xBarCoordinate, CLOUD_HEIGHT - CLOUD_Y - TEXT_HEIGHT * TEXT_LINE_HEIGHT - barHeight);
  }
};
