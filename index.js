var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var buttonColors = ["red", "green", "blue", "yellow"];


$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
});

if ($(window).width()<1000){
    $("#level-title").css("display","none");
} else{
    $(".mobileButton").css("display", "none");
}
$(".mobileButton").click(function(){
    if(!started){
        $(".mobileButton").css("display", "none");
        $("#level-title").css("display","block");
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
        
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("./sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else{
        playSound("wrong");
        $("body").addClass("game-over");
        if ($(window).width()<1000){
            $(".mobileButton").css("display","inline-block");
            $(".mobileButton").text("Restart");
            $("#level-title").text("Game Over");
        }else{
            $("#level-title").text("Game Over, Press Any Key To Restart");
        }

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}