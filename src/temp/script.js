$(document).ready(function() {
    var swiper = new Swiper('.data__forecast', {
        slidesPerView: 7,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            250: {
              slidesPerView: 2,
            },
            300: {
              slidesPerView: 3,
            },
            400: {
              slidesPerView: 4,
            },
            736: {
              slidesPerView: 6,
            },
            950: { // min-width 735
              slidesPerView: 7,
            }
          }
    });
});



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

// let toggle = true;
// let toggle1 = true;
// const navRightBtn = document.querySelector('.navigation__btns');
// const navLeftLogo = document.querySelector('.navigation__logo');

// const mediaMobile = (media, back) => {
//   const markUp = `
//       <div class="navigation__left navigation__left--mobile">
//           <a href="#" class="navigation__logo">Weather<span>App<span class="navigation__copy">&copy;</span></span></a>

//           <div class="navigation__themes">
//               <svg class="navigation__themes-ico">
//                   <use xlink:href="resources/icons/sprite.svg#software_paintroller"></use>
//               </svg>

//               <div class="navigation__dropdown navigation__themes-slidedown">
//                       <div class="navigation__dropdown-item">
//                           <input type="radio" class="navigation__statecheck navigation__statecheck--themes-light" id="light" name="theme" value="light" checked>
//                           <label for="light" class="navigation__state--t">Light</label>
//                       </div>

//                       <div class="navigation__dropdown-item">
//                           <input type="radio" class="navigation__statecheck navigation__statecheck--themes-con" id="con" name="theme" value="contrast">
//                           <label for="con" class="navigation__state--t">Contrast</label>
//                       </div>
//               </div>
//           </div>

//           <div class="navigation__lang">
//               <span class=navigation__lang-cur>EN</span>

//               <svg class="navigation__lang-ico">
//                   <use xlink:href="resources/icons/sprite.svg#arrows_down"></use>
//               </svg>

//               <div class="navigation__dropdown navigation__lang-slidedown">
//                   <div class="navigation__dropdown-item navigation__en">
//                       <input type="radio" class="navigation__statecheck" id="en" name="lang" checked>
//                       <label for="en" class="navigation__state">English</label>
//                   </div>
//                   <div class="navigation__dropdown-item navigation__de">
//                       <input type="radio" class="navigation__statecheck" id="de" name="lang">
//                       <label for="de" class="navigation__state">Deutsch</label>
//                   </div>
//               </div>
//           </div>
//       </div>
//       <div class="navigation__right navigation__right--mobile">
//           <button class="navigation__print navigation__btns" onclick="jQuery('.data').print()">
//               <svg class="navigation__icons">
//                   <use xlink:href="resources/icons/sprite.svg#basic_laptop"></use>
//               </svg>
//               <div class="navigation__tooltips navigation__tooltips--hint">
//                   <span class="navigation__title">Print</span>
//                   <p class="navigation__hint">Choose landscape<br>print layout.</p>
//               </div>
//           </button>
//           <button class="navigation__clear navigation__btns">
//               <svg class="navigation__icons">
//                   <use xlink:href="resources/icons/sprite.svg#arrows_circle_remove"></use>
//               </svg>
//               <div class="navigation__tooltips">Clear</div>
//           </button>
//           <button class="navigation__update navigation__btns">
//               <svg class="navigation__icons">
//                   <use xlink:href="resources/icons/sprite.svg#arrows_rotate"></use>
//               </svg>
//               <div class="navigation__tooltips navigation__tooltips--right">Update</div>
//           </button>
//       </div>
//     `;

//     if (media.matches && toggle) {
//         document.querySelector('.navigation__left').innerHTML = "";
//         document.querySelector('.navigation__right').innerHTML = "";
//         document.querySelector('.navigation__mobile').insertAdjacentHTML('afterbegin', markUp);
//         console.log('media loaded');
//         toggle = false;
//         return toggle;
//     } else if (back.matches && toggle1) {
//       const navLeft = `
//         <a href="#" class="navigation__logo">Weather<span>App<span class="navigation__copy">&copy;</span></span></a>

//             <div class="navigation__themes">
//                 <svg class="navigation__themes-ico">
//                     <use xlink:href="resources/icons/sprite.svg#software_paintroller"></use>
//                 </svg>

//                 <div class="navigation__dropdown navigation__themes-slidedown">
//                         <div class="navigation__dropdown-item">
//                             <input type="radio" class="navigation__statecheck navigation__statecheck--themes-light" id="light" name="theme" value="light" checked>
//                             <label for="light" class="navigation__state--t">Light</label>
//                         </div>

//                         <div class="navigation__dropdown-item">
//                             <input type="radio" class="navigation__statecheck navigation__statecheck--themes-con" id="con" name="theme" value="contrast">
//                             <label for="con" class="navigation__state--t">Contrast</label>
//                         </div>
//                 </div>
//             </div>

//             <div class="navigation__lang">
//                 <span class=navigation__lang-cur>EN</span>

//                 <svg class="navigation__lang-ico">
//                     <use xlink:href="resources/icons/sprite.svg#arrows_down"></use>
//                 </svg>

//                 <div class="navigation__dropdown navigation__lang-slidedown">
//                     <div class="navigation__dropdown-item navigation__en">
//                         <input type="radio" class="navigation__statecheck" id="en" name="lang" checked>
//                         <label for="en" class="navigation__state">English</label>
//                     </div>
//                     <div class="navigation__dropdown-item navigation__de">
//                         <input type="radio" class="navigation__statecheck" id="de" name="lang">
//                         <label for="de" class="navigation__state">Deutsch</label>
//                     </div>
//                 </div>
//             </div>
//           `;
//           document.querySelector('.navigation__left').insertAdjacentHTML('afterbegin', navLeft);

//           const navRight = `
//             <button class="navigation__print navigation__btns" onclick="jQuery('.data').print()">
//             <svg class="navigation__icons">
//                 <use xlink:href="resources/icons/sprite.svg#basic_laptop"></use>
//             </svg>
//             <div class="navigation__tooltips navigation__tooltips--hint">
//                 <span class="navigation__title">Print</span>
//                 <p class="navigation__hint">Choose landscape<br>print layout.</p>
//             </div>
//         </button>
//         <button class="navigation__clear navigation__btns">
//             <svg class="navigation__icons">
//                 <use xlink:href="resources/icons/sprite.svg#arrows_circle_remove"></use>
//             </svg>
//             <div class="navigation__tooltips">Clear</div>
//         </button>
//         <button class="navigation__update navigation__btns">
//             <svg class="navigation__icons">
//                 <use xlink:href="resources/icons/sprite.svg#arrows_rotate"></use>
//             </svg>
//             <div class="navigation__tooltips navigation__tooltips--right">Update</div>
//         </button>
//           `;
//         document.querySelector('.navigation__right').insertAdjacentHTML('afterbegin', navRight);
//         toggle1 = false;
//         return toggle1;
//     }
// }

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

