const slide = $('.navigation__lang-slidedown');
const ico = $('.navigation__lang-ico');
const slideR = $('.navigation__lang-r-slidedown');
const icoR = $('.navigation__lang-r-ico');

document.addEventListener('click', event => {
  if (event.target.matches('.navigation__lang, .navigation__lang *')) {
      if (slide.is(':hidden')) {
        slide.slideDown();
        ico.css({'transform': 'rotate('+ 180 + 'deg)'});
      } else {
        slide.slideUp();
        ico.css({'transform': 'rotate('+ 0 + 'deg)'});
      };
  } else {
      slide.slideUp();
      ico.css({'transform': 'rotate('+ 0 + 'deg)'});
  };

  if (event.target.matches('.navigation__lang--r, .navigation__lang--r *')) {
      if (slideR.is(':hidden')) {
        slideR.slideDown();
        icoR.css({'transform': 'rotate('+ 180 + 'deg)'});
      } else {
         slideR.slideUp();
         icoR.css({'transform': 'rotate('+ 0 + 'deg)'});
      };
  } else {
      slideR.slideUp();
      icoR.css({'transform': 'rotate('+ 0 + 'deg)'});
  };
});



