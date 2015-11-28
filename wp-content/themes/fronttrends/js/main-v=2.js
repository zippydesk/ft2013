(function() {
  "use strict";

  var menu, lis, i, menuItem, nav;

  nav = document.getElementsByTagName('nav')[0];
  lis = nav.getElementsByTagName("li");

  menu = document.createElement("select");

  menuItem = document.createElement("option");
  menuItem.text = "MENU";
  menu.appendChild(menuItem);

  for (i = 0; i < lis.length; i++) {
    menuItem = document.createElement("option");
    menuItem.value = lis[i].firstChild.href;
    menuItem.text = lis[i].firstChild.text;
    menu.appendChild(menuItem);
  }

  if (document.addEventListener) {
    menu.addEventListener("change", function(e) {
      window.location = e.target.options[e.target.selectedIndex].value;
    }, false);
  }

  nav.appendChild(menu);
  
  var activeSchedule = null;
  $('.schedule-page .speakers-list article:not(.break-event)').each(function(idx, item) {
      var scrollBtn = $('<button></button>');
      scrollBtn.html('scroll down');
      $(item).append(scrollBtn);
      $(scrollBtn).addClass('schedule-btn');
      $(scrollBtn).click(function() {
          var currSchedule = $(this).parents('article')[0];
          var currTalkDescription = $(currSchedule).find('.talk-description');
          var currBio = $(currSchedule).find('.talk-bio');
          
          if (activeSchedule !== currSchedule) {
                var activeBtn = $(activeSchedule).find('.schedule-btn')[0];
                if (activeBtn) {
                    $(activeBtn).removeClass('active-btn');
                    var talkDescription = $(activeSchedule).find('.talk-description')[0];
                    var bio = $(activeSchedule).find('.talk-bio')[0];
                    $(talkDescription).slideUp();
                    $(bio).slideUp();
                    bio = null;
                    talkDescription = null;
                }
          }
          var active = !!$(this).hasClass('active-btn');
          if (active) {
              $(this).removeClass('active-btn');
              activeSchedule = null;
              $(currTalkDescription).slideUp();
              $(currBio).slideUp();
          } else {
              $(this).addClass('active-btn');
              activeSchedule = $(this).parents('article')[0];
              $(currTalkDescription).slideDown();
              $(currBio).slideDown();
          }
          
      });
  });

}());