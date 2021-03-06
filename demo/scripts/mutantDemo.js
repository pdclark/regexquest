var mutants = new Array();
var currentRound = 0;

var patternElem;
var replaceWithElem;
var modifiersElem;
var resultDiv;

var demo = {

    clearRegExp: function() {
        patternElem.val("");
        modifiersElem.val("");
    },

    createRegExp: function() {
        var pattern = patternElem.val();
        var replaceWith = replaceWithElem.val();
        var modifiers = modifiersElem.val();
        try {
            return new rq.RegExWithReplacement(pattern, replaceWith, modifiers);
        } catch (err) {
            demo.showResult(false);
        }
    },

    showResult: function(good) {
        if (good) {
            $("#wrongAnswer").hide();
            $("#rightAnswer").show();
            $("#result").css("color", "green");
            $(".infected").fadeOut();
        } else {
            $("#wrongAnswer").show();
            $("#rightAnswer").hide();
            $("#result").css("color", "red");
        }
    },

    checkAnswer: function() {
        if (mutant.checkMatch(demo.createRegExp())) {
            resultDiv.text(mutant.cleanText());
            demo.showResult(true);
        } else {
            resultDiv.text(mutant.infectedText());
            demo.showResult(false);
        }
    },

    clearAnswerArea: function() {
        $("#wrongAnswer").hide();
        $("#rightAnswer").hide();
        resultDiv.text("");
    },

    userUpdate: function(event) {
        // check for enter key press
        var code = (event.keyCode ? event.keyCode : event.which);
        if (code == 13) {
            demo.clearAnswerArea();
            demo.checkAnswer();
        }
    },

    setup: function() {
        var mutant = mutants[currentRound];
        if (!mutant) {
            return;
        }
        $("#mutantText").html(mutant.infectedText());
        demo.clearAnswerArea();

        // for debug purposes
        window.mutant = mutant;

        demo.clearRegExp();
        $("#rounds").text("Round " + (currentRound + 1) + " of " + mutants.length);
        patternElem.keypress(function(event) {
            demo.userUpdate(event);
        });
        replaceWithElem.keypress(function(event) {
            demo.userUpdate(event);
        });
        modifiersElem.keypress(function(event) {
            demo.userUpdate(event);
        });
        $("#checkAnswer").click(function(event) {
            demo.checkAnswer();
        });
        currentRound++;
    }
};

$(document).ready(function() {

    patternElem = $("#pattern");
    replaceWithElem = $("#replaceWith");
    modifiersElem = $("#regexpFlags");
    resultDiv = $("#result");

    mutants = mutants.concat(
        new rq.Mutant("hi mom, how are you today?", [new rq.RegExWithReplacement("o", "0", "g")]),
        new rq.Mutant("hi mom, how are you today?", [new rq.RegExWithReplacement("o", "0", "g"), new rq.RegExWithReplacement("a", "9", "g")]),
        new rq.Mutant(" Help me, I've been infected! ", [new rq.RegExWithReplacement(" ", "g", "g")]),
        new rq.Mutant("Have you seen my son? He was looking sick...", [new rq.RegExWithReplacement("\\.", "8", "g"), new rq.RegExWithReplacement("s", "5", "g")])
    );

    $("#nextRound").click(demo.setup);

    demo.setup();
});