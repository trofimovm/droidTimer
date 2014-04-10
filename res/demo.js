var droidTimer = new (function() {
    var $countdown,
        $form, // Form used to change the countdown time
        incrementTime = 100,
        currentTime = 86400000,
        updateTimer = function() {
            $countdown.html(formatTime(currentTime));
            if (currentTime == 0) {
                droidTimer.Timer.stop();
                timerComplete();
                droidTimer.resetCountdown();
                return;
            }
            currentTime -= incrementTime / 1;
            if (currentTime < 0) currentTime = 0;
        },
        timerComplete = function() {
            alert('Countdown timer complete!');
        },
        init = function() {
            $countdown = $('#countdown');
            droidTimer.Timer = $.timer(updateTimer, incrementTime, false);
            $form = $('#example2form');
            $form.bind('submit', function() {
                droidTimer.resetCountdown();
                return false;
            });
        };
    this.resetCountdown = function() {

        var newHour = parseInt($form.find('input[name=startHour]').val());
        var newMin = parseInt($form.find('input[name=startMin]').val());
        var newSec = parseInt($form.find('input[name=startSec]').val());
        var mlsecH = newHour * 3600000;
        var mlsecM = newMin * 60000;
        var mlsecS = newSec * 1000;
        var newTime = mlsecH + mlsecM + mlsecS;

        if (newTime > 0) {currentTime = newTime;}
        this.Timer.stop().once();
    };
    $(init);
});


function formatTime(s) {

  function addZ(n) {
    return (n<10? '0':'') + n;
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs);
}
