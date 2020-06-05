// $(document).ready(function() {
//     var swiper = new Swiper('.data__forecast', {
//         slidesPerView: 7,
//         navigation: {
//           nextEl: '.swiper-button-next',
//           prevEl: '.swiper-button-prev',
//         },
//         breakpoints: {
//             250: {
//               slidesPerView: 2,
//             },
//             300: {
//               slidesPerView: 3,
//             },
//             400: {
//               slidesPerView: 4,
//             },
//             736: {
//               slidesPerView: 6,
//             },
//             950: { // min-width 735
//               slidesPerView: 7,
//             }
//           }
//     });
// });

document.addEventListener('click', event => {
  if (event.target.matches('.navigation__lang, .navigation__lang *')) {
    if ($('.navigation__lang-slidedown').is(':hidden')) $('.navigation__lang-slidedown').slideDown();
    else $('.navigation__lang-slidedown').slideUp();
  } else {
    $('.navigation__lang-slidedown').slideUp();
  };

  if (event.target.matches('.navigation__lang--r, .navigation__lang--r *')) {
    if ($('.navigation__lang-r-slidedown').is(':hidden')) $('.navigation__lang-r-slidedown').slideDown();
    else $('.navigation__lang-r-slidedown').slideUp();
  } else {
    $('.navigation__lang-r-slidedown').slideUp();
  };
  
  if (event.target.matches('.navigation__themes, .navigation__themes *')) {
    if ($('.navigation__themes-slidedown').is(':hidden')) $('.navigation__themes-slidedown').slideDown();
    else $('.navigation__themes-slidedown').slideUp();
  } else {
    $('.navigation__themes-slidedown').slideUp();
  }

  if (event.target.matches('.navigation__themes--r, .navigation__themes--r *')) {
    if ($('.navigation__themes-r-slidedown').is(':hidden')) $('.navigation__themes-r-slidedown').slideDown();
    else $('.navigation__themes-r-slidedown').slideUp();
  } else {
    $('.navigation__themes-r-slidedown').slideUp();
  }
  
  if (event.target.matches('.navigation__state--t, .navigation__state--t *')) {
    const light = document.querySelector('#light');
    const contrast = document.querySelector('#con');
    const timer = setTimeout(() => {
      console.log(light.checked);
      console.log(contrast.checked);
    }, 1000);
  }

  if (event.target.matches('.navigation__r-state--t, .navigation__r-state--t *')) {
    const lightR = document.querySelector('#r-light');
    const contrastR = document.querySelector('#r-con');
    const timer = setTimeout(() => {
      console.log(lightR.checked);
      console.log(contrastR.checked);
    }, 1000);
  }
  
  if (event.target.matches('.navigation__state, .navigation__state *')) {
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

  if (event.target.matches('.navigation__r-state, .navigation__r-state *')) {
    const enR = document.querySelector('#r-en');
    const deR = document.querySelector('#r-de');
    const timer = setTimeout(() => {
      if (enR.checked) {
        console.log(enR.value + 'r en');
      } else if (deR.checked) {
        console.log(deR.value + 'r de');
      }
    }, 1500);
  }
  // document.getElementById('desiredInput').checked = false;
});

document.querySelector('.navigation__search-field').addEventListener('focusin', () => {
  if ($('.navigation__recent-list').is(':hidden')) $('.navigation__recent-list').slideDown();
  else $('.navigation__recent-list').slideUp();
});

document.querySelector('.navigation__search-field').addEventListener('focusout', () => {
  $('.navigation__recent-list').slideUp();
});

//   const media = window.matchMedia('(max-width: 50.9375em)');
//   const mediaBack = window.matchMedia('(min-width: 59.375em)');
//   mediaMobile(media, mediaBack);
//   media.addListener(mediaMobile);

      
      // function myFunction(x) {
      //   if (x.matches) { // If media query matches
      //     document.body.style.backgroundColor = "yellow";
      //   } else {
      //     document.body.style.backgroundColor = "pink";
      //   }
      // }
      
      // var x = window.matchMedia("(max-width: 700px)")
      // myFunction(x) // Call listener function at run time
      // x.addListener(myFunction) // Attach listener function on state changes
  
    // var hiddenElement = document.createElement('a');
    // hiddenElement.href = 'data:attachment/text,' + encodeURI(splitState);
    // hiddenElement.target = '_blank';
    // hiddenElement.download = 'code.txt';
    // hiddenElement.click();

