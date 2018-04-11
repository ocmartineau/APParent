function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
// $(document).ready(function(){
//   $("#hide").click(function(){
//       $("#content").hide();
//   });
//   $("#show").click(function(){
//       $("#content").show();
//   });
  
// });
$(function() {
var $eventLocation = $("#event-location");
var $eventKeyword = $("#event-keyword");
var $content = $("#content");

var _oArgs = {
  app_key:"7xvLDCCDGL5MnWLF",
  category: "Family",
  q: "Family",
  where: "New Jersey",
  page_size: 25, //amount of listings per search
  image_sizes: "large,medium",
  sort_order: "popularity",
  within: 10
};

var _eventLocation;

$("#event-search").submit(function(e) {
  e.preventDefault();

  conductSearch();
});

function conductSearch() {
  _oArgs.where = $eventLocation.val() ? $eventLocation.val() : "New Jersey";
  _oArgs.q = $eventKeyword.val() ? $eventKeyword.val() : "Family";

  EVDB.API.call("/events/search", _oArgs, function(oData) {
    $content.html("");
    if (oData.events) {
      receiveEvents(oData.events.event);
    } else {
      $('<h2> No ' + _oArgs.q + ' Events in/near ' + _oArgs.where +'</h2>').appendTo($content);
    }
  });
}

function receiveEvents(events) {
  $content.html("");
  $('<h2>' + _oArgs.q + ' Events in/near ' + _oArgs.where +'</h2>').appendTo($content);
  var $ul = $('<ul/>').appendTo($content);

  events.forEach(function(event){
    var $li = $('<li class="event-item"/>').appendTo($ul);
    var event_img = event.image ? event.image.large.url : "http://s1.evcdn.com/images/block250/fallback/event/categories/music/music_default_1.jpg";
    var eventDate = new Date(event.start_time);

    $.get("tpl/item.html", function(data) {
      $li.prepend(tplawesome(data, [{
        event_url: event.url,
        image_url: event_img,
        title: event.title,
        date: formatDate(eventDate),
        day: formatDay(eventDate),
        time: formatAMPM(eventDate),
        venue_name: event.venue_name,
        address: event.venue_address,
        city: event.city_name,
        state: event.region_abbr,
        zip: event.postal_code || "",
      }]));
    });


  });
}

function formatDate(date) {
  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[date.getMonth()] + " " +
         date.getDate() + ", " +
         date.getFullYear();
}

function formatDay(date) {
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][date.getDay()];
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

conductSearch();


}); // end document loaded
