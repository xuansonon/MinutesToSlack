var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthsOfYear = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var dateObject = new Date();
var meetingStart, meetingEnd;

var minutes =  {
  "companyName":"",
  "meetingVenue":"",
  "meetingDate":"",
  "meetingStart":"",
  "meetingEnd":"",
  "meetingDuration":"",
  "participants":[],
  "apologies":[],
  "minuteContent": {
    "general":[],
    "actions":[],
    "decisions":[]
  },

  resetDate: function() {
    dateObject = new Date();
  },

  init: function() {
    document.getElementsByName("startMeetingButton")[0].disabled = false;
    document.getElementsByName("endMeetingButton")[0].disabled = true;
  },

  startMeeting: function() {
    this.resetDate();
    meetingStart = new Date();
    this.meetingStart = this.parseTime(dateObject);
    document.getElementsByName("meetingStart")[0].value = this.meetingStart;
    document.getElementsByName("startMeetingButton")[0].disabled = true;
    document.getElementsByName("endMeetingButton")[0].disabled = false;
  },

  endMeeting: function() {
    this.resetDate();
    meetingEnd = new Date();
    document.getElementsByName("meetingDuration")[0].value = this.parseDuration(meetingEnd - meetingStart);
    this.meetingEnd = this.parseTime(dateObject);
    document.getElementsByName("meetingEnd")[0].value = this.meetingEnd;
    document.getElementsByName("startMeetingButton")[0].disabled = false;
    document.getElementsByName("endMeetingButton")[0].disabled = true;
  },

  parseDuration: function(differenceInMilliseconds) {
    var result = "";
    //70001  milliseconds
    var minutes = Math.floor((differenceInMilliseconds/1000)/60);
    var seconds = Math.round(differenceInMilliseconds/1000)%60;
    return (minutes + " minute(s) and " + seconds + " second(s)");
  },

  grabInput: function() {
    var participants = document.getElementById("participants").value.replace(/\n/g, ";").split(";");
    var apologies = document.getElementById("apologies").value.replace(/\n/g, ";").split(";");
    for(var i = 0; i < participants.length; i++) this.participants[i] = participants[i];
    for(var i = 0; i < apologies.length; i++) this.apologies[i] = apologies[i];
    var general = document.getElementById("general").value.replace(/\n/g,";").split(";");
    var actions = document.getElementById("actions").value.replace(/\n/g,";").split(";");
    var decisions = document.getElementById("decisions").value.replace(/\n/g,";").split(";");
    for(var i = 0; i < general.length; i++) this.minuteContent.general[i] = general[i];
    for(var i = 0; i < actions.length; i++) this.minuteContent.actions[i] = actions[i];
    for(var i = 0; i < decisions.length; i++) this.minuteContent.decisions[i] = decisions[i];
    this.companyName = document.getElementsByName("companyName")[0].value.toUpperCase();
    this.meetingVenue = document.getElementsByName("meetingVenue")[0].value;
    this.meetingDate = document.getElementsByName("meetingDate")[0].value;
    this.meetingStart = document.getElementsByName("meetingStart")[0].value;
    this.meetingEnd = document.getElementsByName("meetingEnd")[0].value;
    this.meetingDuration = document.getElementsByName("meetingDuration")[0].value;
  },

  preparePDF: function() {
    this.grabInput();
  },

  createPDF: function() {
    this.preparePDF();
    console.log(this.participants);
    var doc = new jsPDF();
    var startingPoint = 70;
    doc.setFontSize(43);
    doc.text(15, startingPoint, this.companyName);
    doc.rect(15, startingPoint+4, 180, 1, "F");
    doc.rect(140, startingPoint+2, 61, 5, "F");
    doc.setFontSize(15);
    doc.text(15, startingPoint+11, "Meeting minutes for " + this.meetingDate);
    doc.setFontSize(22);
    doc.text(15, startingPoint+31, "Meeting details");
    doc.setFontSize(13);
    doc.text(15, startingPoint+39, "Meeting Location: " + this.meetingVenue);
    doc.text(15, startingPoint+46, "Meeting time: " + this.meetingStart);
    doc.text(15, startingPoint+53, "Meeting adjourned at: " + this.meetingEnd);
    doc.text(15, startingPoint+60, "Meeting duration: " + this.meetingDuration);
    doc.setFontSize(22);
    doc.text(15, startingPoint+78, "Participants");
    doc.setFontSize(13);
    startingPoint += 7;
    for(var i = 0; i < this.participants.length; i++) {
      doc.text(15, (startingPoint+(79+(i*7))), this.participants[i].valueOf());
    }
    doc.setFontSize(22);
    doc.text(15, startingPoint+(79+(7*this.participants.length))+18, "Apologies");
    doc.setFontSize(13);
    if(this.apologies[0] === "") {
      doc.text(15,startingPoint+(79+(7*this.participants.length))+18+8, "None");
    } else {
      for(var i = 1; i <= this.apologies.length; i++) {
        doc.text(15,startingPoint+(79+(7*this.participants.length))+19+(i*7), this.apologies[i-1].valueOf());
      }
    }
    doc.addPage();
    doc.text(15, 15, "General Information/Discussion and Updates:");
    doc.rect(15, 17, 180, 0.5, "F");
    for(var i = 0; i < this.minuteContent.general.length; i++) {
      var line = "- " + this.minuteContent.general[i];
      doc.text(25, 25+(7*i), line);
    }
    doc.text(15, 105, "Actions to be completed:");
    doc.rect(15, 107, 180, 0.5, "F");
    for(var i = 0; i < this.minuteContent.actions.length; i++) {
      var line = "- " + this.minuteContent.actions[i];
      doc.text(25, 115+(7*i), line);
    }
    doc.text(15, 200, "Decisions made:");
    doc.rect(15, 202, 180, 0.5, "F");
    for(var i = 0; i < this.minuteContent.decisions.length; i++) {
      var line = "- " + this.minuteContent.decisions[i];
      doc.text(25, 210+(7*i), line);
    }
    this.resetDate();
    var fileName = "minutes_" + shortMonths[dateObject.getMonth()] + "-" + dateObject.getDate() + "-" + dateObject.getFullYear() +  ".pdf";
    doc.save(fileName);
  },

  getTodaysDate: function() {
    this.resetDate();
    meetingDate = this.parseDate(dateObject);
    document.getElementsByName("meetingDate")[0].value = meetingDate;
  },

  parseDate: function(timeDate) {
    return daysOfWeek[timeDate.getDay()] + ", " + monthsOfYear[timeDate.getMonth()] + " " + this.ordinal_suffix_of(timeDate.getDate()) + " " + timeDate.getFullYear();
  },

  parseTime: function(timeDate) {
    var meridiem = "AM";
    var minutes = timeDate.getMinutes();
    var hours = timeDate.getHours();
    if(hours >= 12) {
      meridiem = "PM";
      if(hours > 12) {
        hours = (timeDate.getHours() - 12);
      }
    }
    if(minutes < 10) {
      minutes = "0" + timeDate.getMinutes();
    }
    return hours + ":" + minutes + " " + meridiem;
  },

  ordinal_suffix_of: function(i) {
    var j = i % 10, k = i % 100;
    if (j == 1 && k != 11) return i + "st";
    if (j == 2 && k != 12) return i + "nd";
    if (j == 3 && k != 13) return i + "rd";
    return i + "th";
  }
}

minutes.init();
