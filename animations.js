$(document).ready(function(){

  var $workTime = parseInt($('.time').text());
  var $breakTime = parseInt($('#break-number').text());
  var audio = new Audio('Monsterkillsound.mp3');

  function work(thing) {
        int = setInterval(function () {
            if (thing === 'plus' && $workTime >=1) {
              $workTime++;
            } else if ($workTime > 1 && thing === 'minus') {
              $workTime--;
            }
            $(".time").html($workTime);
            $("#work-number").text($workTime);
        }, 75);
  }

  function breakFunction(thing) {
    int = setInterval(function () {
        if (thing === 'plus') {
          $breakTime++;
        } else if (thing === 'minus' && $breakTime >= 1) {
          $breakTime--;
        }
        $("#break-number").text($breakTime);
    }, 75);
  }

  $("#work-minus").mousedown(function() {
    //if ($workTime > 1){
      //$workTime = ($workTime - 1);
      //$(".time").text($workTime);
      work('minus');
    //}
})

  $("#work-plus").mousedown(function(){
    //$workTime = ($workTime + 1);
    //$(".time").text($workTime);
    //$("#work-number").text($workTime);
    work('plus');
  })

  $("#break-minus").mousedown(function(){
    //if ($breakTime > 0) {
    //  $breakTime = ($breakTime - 1);
      //$("#break-number").text($breakTime);
    //}
    breakFunction('minus');
  });

  $("#break-plus").mousedown(function(){
    //$breakTime = ($breakTime + 1);
    //$("#break-number").text($breakTime);
    breakFunction('plus');
  });

  $(document).on("mouseup", function(){
    clearInterval(int);
  });

  var click = 1;
  $(".clock-container").click(function(){
    click = click + 1;
    if (click === 2) {
      Clock.start();
    } else if (click % 2 === 1) {
      Clock.pause();
    } else {
      Clock.resume();
    }
  });


  var time = 0;
  var currentCount = 1;

  var Clock = {
    start: function() {

      this.interval = setInterval(function() {
        $workTime = parseInt($("#work-number").text());
        var workInSeconds = $workTime*60;
        $breakTime = parseInt($("#break-number").text());
        var breakInSeconds = $breakTime*60;

        time = time + 1;
        var remainingTime = workInSeconds - time;

        switch (true) {
          case (remainingTime < 0):
            $('.time-state').text("Break");
            var breakTime = breakInSeconds + remainingTime;
            var minutes = Math.floor(breakTime / 60);
            var seconds = breakTime % (minutes * 60);
            if (breakTime < 60) {
              var seconds = breakInSeconds + remainingTime;
              if (breakTime === 0) {
                var minutes = '0';
                var seconds = '00';
                currentCount = 0;
                audio.play();
              } else if (breakTime < 0) {
                var remainingTime = 0;
                time = 0;
                var remainingTime = workInSeconds - time;
                $('.time-state').text("Work");
                $('.time').text($workTime + ':00');
                return false;
              }
            }
            break;
          case (remainingTime === 0):
            var minutes = '0';
            var seconds = '00';
            currentCount = 0;
            audio.play();
            break;
          case (remainingTime < 60):
            var seconds = remainingTime;
            var minutes = '0';
            break;
          case (remainingTime >= 60):
            var minutes = Math.floor(remainingTime / 60);
            var seconds = remainingTime % (minutes*60);
            break;
          default: console.log("default");
          break;

        }
        if (seconds < 10 && seconds > 0) {
          seconds = '0'+seconds
        }
        $('.time').text(minutes + ':' + seconds);

        // rotating ring around the clock
        var radius = 105;
        var circumference = 2 * radius * Math.PI;
        if ($('.time-state').text() === 'Work') {
        var maxCount = workInSeconds;
        var offset = -(circumference / maxCount) * currentCount;
        $('.radial-progress-cover').css('stroke-dasharray', circumference);
        $('.radial-progress-cover').css('stroke-dashoffset', offset);
        currentCount +=1;
      } else {
        var maxCount = breakInSeconds;
        var offset = -(circumference / maxCount) * currentCount;
        $('.radial-progress-cover').css('stroke-dasharray', circumference);
        $('.radial-progress-cover').css('stroke-dashoffset', offset);
        currentCount +=1;
      }
    }, 1000);
  },
  pause: function() {
    clearInterval(this.interval);
    delete this.interval;
  },
  resume: function() {
    if(!this.interval) this.start();
  }
  };


});
