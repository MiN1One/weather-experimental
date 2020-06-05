$(document).ready(function() {
    var swiper = new Swiper('.data__forecast', {
        slidesPerView: 7,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
        // breakpoints: {
        //     640: {
        //       slidesPerView: 2,
        //       spaceBetween: 20,
        //     },
        //     768: {
        //       slidesPerView: 4,
        //       spaceBetween: 40,
        //     },
        //     1024: {
        //       slidesPerView: 5,
        //       spaceBetween: 50,
        //     },
        //   }
    });

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
});



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

  if (event.target.matches('.navigation__state--t, .navigation__state--t > *')) {
    const light = document.querySelector('#light');
    const contrast = document.querySelector('#con');
    const timer = setTimeout(() => {
      console.log(light.checked);
      console.log(contrast.checked);
    }, 1000);
  }

  if (event.target.matches('.navigation__search-field, .navigation__search-field > *')) {
    // const menu = document.querySelector('.navigation__recent-list');
    if ($('.navigation__recent-list').is(':hidden')) $('.navigation__recent-list').slideDown();
    else $('.navigation__recent-list').slideUp();
  } else {
    $('.navigation__recent-list').slideUp();
  }

  if (event.target.matches('.navigation__state, .navigation__state > *')) {
    const en = document.querySelector('#en');
    const de = document.querySelector('#de');
    const ru = document.querySelector('#ru');
    const timer = setTimeout(() => {
      if (en.checked) {
        console.log(en.value + ' en');
      } else if (de.checked) {
        console.log(de.value + ' de');
      }
    }, 1000);
  }
  // document.getElementById('desiredInput').checked = false;
});

    // var hiddenElement = document.createElement('a');
    // hiddenElement.href = 'data:attachment/text,' + encodeURI(splitState);
    // hiddenElement.target = '_blank';
    // hiddenElement.download = 'code.txt';
    // hiddenElement.click();