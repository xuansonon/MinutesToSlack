$(document).ready(function(){
  var minutesArrow = false;
  var slackArrow = false;
  $("#minutesHeader").click(function(){
    $(this).next().slideToggle('slow');
    if(minutesArrow) {
      $("#minuteArrows").css({"-moz-transform":"rotate(0deg)"});
      minutesArrow = false;
    } else {
      minutesArrow = true;
      $("#minuteArrows").css({"-moz-transform":"rotate(90deg)"});
    }

  });
  $("#slackHeader").click(function(){
    $(this).next().slideToggle('slow');
    if(slackArrow) {
      $("#slackArrows").css({"-moz-transform":"rotate(0deg)"});
      slackArrow = false;
    } else {
      slackArrow = true;
      $("#slackArrows").css({"-moz-transform":"rotate(90deg)"});
    }
  });
});
