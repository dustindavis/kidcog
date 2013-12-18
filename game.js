gameControl = (function () {

    var currentAnswer = 0;
    var score = 0;
    var startTime = new Date();
    var endTime = new Date();

    var _self = this;

    init = function () {
        $('a#startGame').click(function (e) {
            e.preventDefault();
            $('#gameOptions').hide();
            var playerName = $('input#playername').val();
            $('#gamePlayer').html(playerName);
            $('#game').show();
            showAnswerResponse("start");

            for (var i = 0; i < allItems.length; i++) {
                allItems[i].start();
            }

        });

        $('div.clickableAnswer').click(function (e) {
            endTime = new Date();
            var aid = $(this).attr('answerid');

            if (aid == currentAnswer) {
                showAnswerResponse("correct");
                calculateScore();
                _self.onCorrectAnswer(_self.currentEn);

            } else {
                showAnswerResponse("incorrect");
                _self.onWrongAnswer(_self.currentEn);
            }
        });
    }

    calculateScore = function () {
        var result = endTime.getTime() - startTime.getTime();
        var addScore = 0;

        if (result < 1500) { addScore = 100; }
        else {
            addScore = 100 - parseInt((result - 1500) / 10);
        }

        if (addScore < 40) { addScore = 40; }

        score = score + addScore;
        $('#gameScore').html(score);
    }

    showAnswerResponse = function (type) {
        $('#' + type).show().fadeOut("slow");
    }

    newSlide = function (en) {

        _self.currentEn = en;
        _self.onQuestionInvoke(en);

        $('#gamescreen').removeClass('answer' + currentAnswer);
        $('#question').show();

        while (true) {
            var newAid = Math.floor((Math.random() * 4) + 1);
            if (newAid != currentAnswer) {
                currentAnswer = newAid;
                break;
            }
        }
        $('#gamescreen').addClass('answer' + currentAnswer);
        startTime = new Date();
    }

    setCallbacks = function (correct, wrong, invoke) {
        _self.onCorrectAnswer = correct;
        _self.onWrongAnswer = wrong;
        _self.onQuestionInvoke = invoke;
    }

    close = function () {
        $('#question').hide();
    }

    onCorrectAnswer = function (en) { }
    onWrongAnswer = function (en) { }
    onQuestionInvoke = function (en) { }

    return {
        init: init,
        newSlide: newSlide,
        setCallbacks: setCallbacks,
        close: close
    }

})();
