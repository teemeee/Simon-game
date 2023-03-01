let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStart = false;

function nextSequence() {

  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  
  let sound = new Audio("sounds/" + $(this).attr('id') + ".mp3");
  sound.play();
}

$(".btn").click(function() {

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  $(this).fadeOut(100).fadeIn(100);
  let sound = new Audio("sounds/" + $(this).attr("id") + ".mp3");
  sound.play();
  
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function() {
  if (!gameStart) {
    $("#level-title").text("Level" + " " + level);
    gameStart = true;
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    let wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}

