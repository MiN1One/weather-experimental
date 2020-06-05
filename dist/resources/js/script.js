// $(document).ready(function() {
//     var swiper = new Swiper('.data__forecast', {
//         slidesPerView: 7,
//         navigation: {
//           nextEl: '.swiper-button-next',
//           prevEl: '.swiper-button-prev',
//         }
//         // breakpoints: {
//         //     640: {
//         //       slidesPerView: 2,
//         //       spaceBetween: 20,
//         //     },
//         //     768: {
//         //       slidesPerView: 4,
//         //       spaceBetween: 40,
//         //     },
//         //     1024: {
//         //       slidesPerView: 5,
//         //       spaceBetween: 50,
//         //     },
//         //   }
//     });

    // $('.navigation__lang').click(function () {
    //   if ($('.navigation__lang-slidedown').first().is(':hidden') ) {
    //     $('.navigation__lang-slidedown').slideDown();
    //   } else {
    //     $('.navigation__lang-slidedown').slideUp();
    //   }
    // });

  //   $(document).click(function(event) {
  //     if ($(event.target).first().closest('.navigation__lang', 'span')) {
  //       if ($('.navigation__lang-slidedown').is(':hidden')) $('.navigation__lang-slidedown').slideDown();
  //       else $('.navigation__lang-slidedown').slideUp();
  //     } else {
  //       $('.navigation__lang-slidedown').slideUp();
  //   }
  // });
// });



document.addEventListener('click', event => {
  if (event.target.matches('.navigation__lang, .navigation__lang > *')) {
    if ($('.navigation__lang-slidedown').is(':hidden')) $('.navigation__lang-slidedown').slideDown();
    else $('.navigation__lang-slidedown').slideUp();
  } else {
    $('.navigation__lang-slidedown').slideUp();
  };

  if (event.target.matches('.navigation__themes, .navigation__themes > *')) {
    if ($('.navigation__themes-slidedown').is(':hidden')) $('.navigation__themes-slidedown').slideDown();
    else $('.navigation__themes-slidedown').slideUp();
  } else {
    $('.navigation__themes-slidedown').slideUp();
  }

  if (event.target.className === '.navigation__state') {
    console.log(document.querySelector('.navigation__statecheck').checked);
    console.log(document.querySelector('.navigation__statecheck').value);
  }

});

function getRadioVal(form, name) {
  var val;
  // get list of radio buttons with specified name
  var radios = form.elements[name];
  
  // loop through list of radio buttons
  for (var i=0, len=radios.length; i<len; i++) {
      if ( radios[i].checked ) { // radio checked?
          val = radios[i].value; // if so, hold its value in val
          break; // and break out of for loop
      }
  }
  return val; // return value of checked radio or undefined if none checked
}


// const langCheck = document.querySelector('.navigation__lang-check');

// if (langCheck.checked)


    // var hiddenElement = document.createElement('a');
    // hiddenElement.href = 'data:attachment/text,' + encodeURI(splitState);
    // hiddenElement.target = '_blank';
    // hiddenElement.download = 'code.txt';
    // hiddenElement.click();