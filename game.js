const buttonColors = ["red", "blue", "green", "yellow"];
var isStarted = false;
var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var soundOn = true;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").click(function () {
  if (!isStarted) {
    return;
  }
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(this);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  if (soundOn) {
    new Audio("./sounds/" + name + ".mp3").play();
  }
}

function animatePress(currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout(function () {
    $(currentColour).removeClass("pressed");
  }, 100);
}

$(document).keypress(function () {
  if (isStarted) {
    return;
  }
  $("#level-title").text("Level " + level);
  nextSequence();
  isStarted = true;
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
    startOver();
  }, 200);
  playSound("wrong");
}

function startOver() {
  isStarted = false;
  gamePattern = [];
  level = 0;
}

function toggleSound(toggler) {
  soundOn = !soundOn;
  if (soundOn) {
    $(toggler).text("🔊");
  } else {
    $(toggler).text("🔈");
  }
}

$("#toggle-sound-image").click(function () {
  toggleSound(this);
});
