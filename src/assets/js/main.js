'use strict';

document.addEventListener('DOMContentLoaded', function() {
  /* ------------ Main-Nav ------------ */
  if ( window.matchMedia('(max-width: 767px)').matches ) {
    /* Toggler Navbar */
    let toggleNavbar = document.querySelector('.toggle-navbar');
    
    toggleNavbar.addEventListener('click', function() {
      let body = document.body;

      if ( !body.classList.contains('is-navbar-opened') ) {
        body.classList.add('is-navbar-opened');
        // body.style.paddingRight = scrollWidth() + 'px';
        toggleNavbar.classList.add('is-active');
        addOverlay();

        setTimeout(function() {
          document.addEventListener('click', clickOutsideNavbar);
        });
      }
    });
    /* Toggler Navbar */

    /* Toggles Inside */
    // create toggles
    let navbarLinks = document.querySelectorAll('.main-nav__container a');
    // let navbarLinks = document.querySelectorAll('.main-nav__container .icon');

    navbarLinks.forEach(function(item) {
      if ( item.closest('li').querySelector('ul') ) {
        item.classList.add('has-dropdown');
      }
    });

    let dropdownToggles = document.querySelectorAll('.main-nav .has-dropdown');

    dropdownToggles.forEach(function(item) {
      item.addEventListener('click', function(e) {
        item.closest('li').classList.toggle('is-opened');

        e.preventDefault();
      });
    });
    /* Toggles Inside */

    function clickOutsideNavbar(e) {
      let target = e.target.closest('.main-nav');

      if (target) return;

      document.body.classList.remove('is-navbar-opened');
      toggleNavbar.classList.remove('is-active');
      // document.body.style.paddingRight = '';
      removeOverlay();
      document.removeEventListener('click', clickOutsideNavbar);
    }
  }
  /* ------------ Main-Nav ------------ */

  /* ------------ Tabs ------------ */
  document.querySelectorAll('.tabs').forEach(function(item) {

    item.querySelectorAll('.tabs__link').forEach(function(item, i) {

      item.addEventListener('click', function(e) {
        let target = e.target;

        e.preventDefault();

        if ( target.classList.contains('is-active') ) return;

        let hash = target.getAttribute('href');
        if (hash != '#') {
          window.location.hash = hash;
        }

        let root = target.closest('.tabs');
        clearTabClasses(root, i);
      });

    });

  });

  function clearTabClasses(root, i) {
    root.querySelectorAll('.tabs__item').forEach(function(item) {
      item.querySelector('.tabs__link').classList.remove('is-active');
    });
    root.querySelectorAll('.tabs__tab-pane').forEach(function(item) {
      item.classList.remove('is-active');
    });

    root.querySelector('.tabs__item:nth-child(' + (i+1) + ') .tabs__link').classList.add('is-active');
    root.querySelector('.tabs__tab-pane:nth-child(' + (i+1) + ')').classList.add('is-active');
  }

  let currentHash = window.location.hash;
  let hashTab = document.querySelector('.tabs__link[href="' + currentHash + '"]');
  if (hashTab) {
    let ev = new Event('click');
    hashTab.dispatchEvent(ev);
  }
  /* ------------ Tabs ------------ */

  /* ------------ Custom Scroll ------------ */
  const customScrolls = document.querySelectorAll('.js-custom-scroll');

  if (customScrolls) {
    customScrolls.forEach(function(el) {
      new SimpleBar(el, {
        autoHide: false,
        scrollbarMinSize: 4
      });
    });
  }
  /* ------------ Custom Scroll ------------ */

  /* ------------ Tippy JS ------------ */
  tippy('[data-tippy-content]', {
    theme: 'white-border'
  });
  /* ------------ Tippy JS ------------ */

  /* ------------ Promo Carousel ------------ */
  const promoCarousel = new Swiper('.js-promo-carousel', {
    loop: true,
    slidesPerView: 1,
    // spaceBetween: 10,

    pagination: {
      el: '.promo-carousel__pagination',
      clickable: true
    },

    navigation: {
      nextEl: '.promo-carousel__next',
      prevEl: '.promo-carousel__prev',
    },

    breakpoints: {
      480: {},
      576: {},
      768: {},
      992: {},
      1200: {}
    }
  });
  /* ------------ Promo Carousel ------------ */

  /* ------------ Interactive Carousel ------------ */
  const interactiveCarousel = new Swiper('.js-interactive-carousel', {
    loop: true,
    slidesPerView: 1,
    // spaceBetween: 10,

    pagination: {
      el: '.interactive-carousel__pagination',
      clickable: true
    },

    breakpoints: {
      480: {},
      576: {},
      768: {},
      992: {},
      1200: {}
    }
  });
  /* ------------ Interactive Carousel ------------ */

  /* ------------ Footer Collapse ------------ */
  document.querySelector('.js-footer-collapse').addEventListener('click', function(e) {
    let target = e.target.closest('.footer-collapse__title');

    if (!target) return;

    target.parentNode.classList.toggle('is-toggled');
  });
  /* ------------ Footer Collapse ------------ */

  /* ------------ Main Carousel ------------ */
  const brandsCarousel = new Swiper('.js-brands-carousel', {
    loop: true,

    slidesPerView: 4,
    centeredSlides: true,

    spaceBetween: 10,
    mousewheel: true,

    lazy: true,
    preloadImages: false,
    speed: 500,

    autoplay: {
      delay: 2000,
      disableOnInteraction: true,
    },

    breakpoints: {
      480: {
        slidesPerView: 5
      },
      576: {
        slidesPerView: 6
      },
      768: {
        slidesPerView: 7
      },
      992: {
        slidesPerView: 8
      },
      1200: {
        slidesPerView: 10
      }
    }
  });

  document.querySelector(".js-brands-carousel").addEventListener('mouseenter', function() {
    brandsCarousel.autoplay.stop();
  });

  document.querySelector(".js-brands-carousel").addEventListener('mouseleave', function() {
    brandsCarousel.autoplay.start();
  });
  /* ------------ Main Carousel ------------ */

  /* =============== Header-Dropdowns =============== */
  let dropdownsContainer = document.querySelector('.header__utilities');

  dropdownsContainer.querySelectorAll('.header-utility__main').forEach(function(item) {
    item.addEventListener('mouseenter', function(e) {
      this.classList.add('is-opened');
    });
  });

  dropdownsContainer.querySelectorAll('.header-utility__main').forEach(function(item) {
    item.addEventListener('mouseleave', function(e) {
      this.classList.remove('is-opened');
    });
  });

  dropdownsContainer.addEventListener('click', function(e) {
    let target = e.target.closest('.header-utility__dropdown-close');

    if (!target) return;

    target.closest('.header-utility__main').classList.remove('is-opened');
  });
  /* =============== Header-Dropdowns =============== */

  /* ------------ Choices Selects ------------ */
  if ( document.querySelector('.js-select-default') ) {
    const choicesDefault = new Choices('.js-select-default', {
      delimiter: ',',
      searchEnabled: false,
      itemSelectText: ''
    });
  };

  if ( document.querySelector('.js-select-autocomplete') ) {
    const choicesAutocomplete = new Choices('.js-select-autocomplete', {
      delimiter: ',',
      itemSelectText: ''
    });
  };

  /* Choices Countries */
  const regionsSelect = document.querySelector('.js-select-region');

  if (regionsSelect) {
    let worldwideChoices = new Choices('.js-select-region', {

      callbackOnCreateTemplates: function(strToEl) {

        let classNames = this.config.classNames;
        let itemSelectText = this.config.itemSelectText;

        return {

          item: function(classNames, data) {
            return strToEl(
              '\
                <div\
                  class="' +
                      String(classNames.item) +
                      ' ' +
                      String(
                        data.highlighted
                          ? classNames.highlightedState
                          : classNames.itemSelectable,
                      ) +
                      '"\
                  data-item\
                  data-id="' +
                      String(data.id) +
                      '"\
                  data-value="' +
                      String(data.value) +
                      '"\
                  ' +
                      String(data.active ? 'aria-selected="true"' : '') +
                      '\
                  ' +
                      String(data.disabled ? 'aria-disabled="true"' : '') +
                      '\
                  >\
                  <span class="country-icon ' + data.value +  '"></span> ' +
                      String(data.label) +
                      '\
                </div>\
              ',
            );
          },

          choice: function(classNames, data) {
            return strToEl(
                '\
                  <div\
                    class="' +
                        String(classNames.item) +
                        ' ' +
                        String(classNames.itemChoice) +
                        ' ' +
                        String(
                          data.disabled
                            ? classNames.itemDisabled
                            : classNames.itemSelectable,
                        ) +
                        '"\
                    data-select-text="' +
                        String(itemSelectText) +
                        '"\
                    data-choice \
                    ' +
                        String(
                          data.disabled
                            ? 'data-choice-disabled aria-disabled="true"'
                            : 'data-choice-selectable',
                        ) +
                        '\
                    data-id="' +
                        String(data.id) +
                        '"\
                    data-value="' +
                        String(data.value) +
                        '"\
                    ' +
                        String(
                          data.groupId > 0 ? 'role="treeitem"' : 'role="option"',
                        ) +
                        '\
                    >\
                    <span class="flag-icon ' + data.value + '"></span> ' +
                        String(data.label) +
                        '\
                </div>\
              ',
            );
          },

        };

      },

      itemSelectText: '',
      searchEnabled: false,
      shouldSort: false,
    });
  }
  /* Choices Countries */

  /* Choices Sets */
  const setSelect = document.querySelector('.js-select-set');

  if (setSelect) {

    let setChoices = new Choices('.js-select-set', {

      callbackOnCreateTemplates: function(strToEl) {

        let classNames = this.config.classNames;
        let itemSelectText = this.config.itemSelectText;

        return {

          item: function(classNames, data) {
            return strToEl(
              '\
                <div\
                  class="' +
                      String(classNames.item) +
                      ' ' +
                      String(
                        data.highlighted
                          ? classNames.highlightedState
                          : classNames.itemSelectable,
                      ) +
                      '"\
                  data-item\
                  data-id="' +
                      String(data.id) +
                      '"\
                  data-value="' +
                      String(data.value) +
                      '"\
                  ' +
                      String(data.active ? 'aria-selected="true"' : '') +
                      '\
                  ' +
                      String(data.disabled ? 'aria-disabled="true"' : '') +
                      '\
                  >\
                  <span class="extra-price ' + data.value +  '">+ 300 MDL</span> ' +
                      String(data.label) +
                      '\
                </div>\
              ',
            );
          },

          choice: function(classNames, data) {
            return strToEl(
              '\
                <div\
                  class="' +
                      String(classNames.item) +
                      ' ' +
                      String(classNames.itemChoice) +
                      ' ' +
                      String(
                        data.disabled
                          ? classNames.itemDisabled
                          : classNames.itemSelectable,
                      ) +
                      '"\
                  data-select-text="' +
                      String(itemSelectText) +
                      '"\
                  data-choice \
                  ' +
                      String(
                        data.disabled
                          ? 'data-choice-disabled aria-disabled="true"'
                          : 'data-choice-selectable',
                      ) +
                      '\
                  data-id="' +
                      String(data.id) +
                      '"\
                  data-value="' +
                      String(data.value) +
                      '"\
                  ' +
                      String(
                        data.groupId > 0 ? 'role="treeitem"' : 'role="option"',
                      ) +
                      '\
                  >\
                  <span class="extra-price ' + data.value + '"></span> ' +
                      String(data.label) +
                      '\
                </div>\
              ',
            );
          },

        };

      },

      itemSelectText: '',
      searchEnabled: false,
      shouldSort: false,
    });
  }
  /* Choices Sets */

  /* Choices Colors */
  const colorsSelect = document.querySelector('.js-select-color');

  if (colorsSelect) {

    let colorChoices = new Choices('.js-select-color', {

      callbackOnCreateTemplates: function(strToEl) {

        let classNames = this.config.classNames;
        let itemSelectText = this.config.itemSelectText;

        return {

          item: function(classNames, data) {
            return strToEl(
              '\
                <div\
                  class="' +
                      String(classNames.item) +
                      ' ' +
                      String(
                        data.highlighted
                          ? classNames.highlightedState
                          : classNames.itemSelectable,
                      ) +
                      '"\
                  data-item\
                  data-id="' +
                      String(data.id) +
                      '"\
                  data-value="' +
                      String(data.value) +
                      '"\
                  ' +
                      String(data.active ? 'aria-selected="true"' : '') +
                      '\
                  ' +
                      String(data.disabled ? 'aria-disabled="true"' : '') +
                      '\
                  >\
                  <span class="color-icon ' + data.value +  '"></span> ' +
                      String(data.label) +
                      '\
                </div>\
              ',
            );
          },

          choice: function(classNames, data) {
            return strToEl(
              '\
                <div\
                  class="' +
                      String(classNames.item) +
                      ' ' +
                      String(classNames.itemChoice) +
                      ' ' +
                      String(
                        data.disabled
                          ? classNames.itemDisabled
                          : classNames.itemSelectable,
                      ) +
                      '"\
                  data-select-text="' +
                      String(itemSelectText) +
                      '"\
                  data-choice \
                  ' +
                      String(
                        data.disabled
                          ? 'data-choice-disabled aria-disabled="true"'
                          : 'data-choice-selectable',
                      ) +
                      '\
                  data-id="' +
                      String(data.id) +
                      '"\
                  data-value="' +
                      String(data.value) +
                      '"\
                  ' +
                      String(
                        data.groupId > 0 ? 'role="treeitem"' : 'role="option"',
                      ) +
                      '\
                  >\
                  <span class="color-icon ' + data.value + '"></span> ' +
                      String(data.label) +
                      '\
                </div>\
              ',
            );
          },

        };

      },

      itemSelectText: '',
      searchEnabled: false,
      shouldSort: false,
    });
  }
  /* Choices  Colors */
  /* ------------ Choices Selects ------------ */

    /* ------------ Filter ------------ */
  /* Filter-Slider */
  let priceRange = document.getElementById('price-range');
  let inputNumberA = document.getElementById('input-number-a');
  let inputNumberB = document.getElementById('input-number-b');
  let inputs = [inputNumberA, inputNumberB];

  if (priceRange) {
    noUiSlider.create(priceRange, {
      start: [4500, 17000],
      connect: true,
      // tooltips: true,
      range: {
        'min': 300,
        'max': 22000
      },
      format:{
        to: function(e) {
          return Math.round(e)
        },
        from:function(e) {
          return Number(e)
        }
      }
    });

    priceRange.noUiSlider.on('update', function(values, handle) {
      inputs[handle].value = values[handle];
    });

    inputNumberA.addEventListener('change', function() {
      priceRange.noUiSlider.set([this.value, null]);
    });

    inputNumberB.addEventListener('change', function() {
      priceRange.noUiSlider.set([null, this.value]);
    });
  }
  /* Filter-Slider */

  /* Show more */
  let filterHeadings = document.querySelectorAll('.filter__title');

  filterHeadings.forEach(function(item) {
    item.addEventListener('click', function(e) {
      let parent = e.target.closest('.filter__section');

      parent.classList.toggle('is-hidden');
    });
  });

  let filterMoreToggles = document.querySelectorAll('.filter__more-options');

  filterMoreToggles.forEach(function(item) {
    item.addEventListener('click', function(e) {
      let parent = e.target.closest('.filter__section');
      let textNode = this.children[0];
      
      if ( parent.classList.contains('is-fields-on') ) {
        parent.classList.remove('is-fields-on');
        textNode.innerHTML = 'Показать все';
      } else {
        parent.classList.add('is-fields-on');
        textNode.innerHTML = 'Скрыть';
      }

      e.preventDefault();
    });
  });
  /* Show more */

  /* Filter-Mobile */
  let filterToggle = document.querySelector('.js-filter-toggle');

  if (filterToggle) {

    filterToggle.addEventListener('click', function(e) {
      let body = document.body;

      if ( !body.classList.contains('is-filter-opened') ) {
        addOverlay();
        body.classList.add('is-filter-opened');
        body.style.paddingRight = scrollWidth() + 'px';

        setTimeout(function() {
          document.addEventListener('click', clickOutsideFilter);
        });
      }

      e.preventDefault();

    });

  }

  let filterClose = document.querySelector('.filter__close');

  if (filterClose) {

    filterClose.addEventListener('click', function(e) {
      let target = e.target.closest('.filter');

      if ( !target ) return;

      removeOverlay();
      document.body.classList.remove('is-filter-opened');
      document.body.style.paddingRight = '';

      document.removeEventListener('click', clickOutsideFilter);
    });

  }

  function clickOutsideFilter(e) {
    let target = e.target.closest('.filter');

    if (target) return;

    removeOverlay();
    document.body.classList.remove('is-filter-opened');
    document.body.style.paddingRight = '';

    document.removeEventListener('click', clickOutsideFilter);
  }
  /* Filter-Mobile */

  /* Filter-Toggle-Section */
  document.addEventListener('click', function(e) {
    let target = e.target.closest('.filter__title');

    if (!target) return;

    target.closest('.filter__section').classList.toggle('is-opened');
  });
  /* Filter-Toggle-Section */
  /* ------------ Filter ------------ */

  /* ------------ Sort-By Toggle Mobile ------------ */
  const sortByToggle = document.querySelector('.js-sort-by-toggle');

  if (sortByToggle) {
    sortByToggle.addEventListener('click', function(e) {
      let body = document.body;

      if ( !body.classList.contains('is-sort-buy-opened') ) {
        addOverlay();
        body.classList.add('is-sort-buy-opened');
        body.style.paddingRight = scrollWidth() + 'px';

        setTimeout(function() {
          document.addEventListener('click', clickOutsideSortBy);
        });
      }

      e.preventDefault();
    });
  }

  const sortByClose = document.querySelector('.sort-by-window__close');

  if (sortByClose) {

    sortByClose.addEventListener('click', function(e) {
      let target = e.target.closest('.sort-by-window');

      if ( !target ) return;

      removeOverlay();
      document.body.classList.remove('is-sort-buy-opened');
      document.body.style.paddingRight = '';

      document.removeEventListener('click', clickOutsideSortBy);
    });

  }

  function clickOutsideSortBy(e) {
    let target = e.target.closest('.sort-by-window');

    if (target) return;

    removeOverlay();
    document.body.classList.remove('is-sort-buy-opened');
    document.body.style.paddingRight = '';

    document.removeEventListener('click', clickOutsideSortBy);
  }
  /* ------------ Sort-By Toggle Mobile ------------ */

  /* ------------ Product-Main ------------ */
  let galleryThumbs = new Swiper('.js-thumbs-list', {
    direction: 'vertical',
    slidesPerView: 5,
    spaceBetween: 5,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,

    navigation: {
        prevEl: '.product-main-promo__th-prev',
        nextEl: '.product-main-promo__th-next'
    }
  });

  let galleryMain = new Swiper('.js-promo-main', {
      spaceBetween: 10,
      // effect: 'coverflow',

      pagination: {
        el: '.product-main-promo__pagination',
        clickable: true
      },

      breakpoints: {
          768: {
            pagination: false
          }
      },

      thumbs: {
          swiper: galleryThumbs
      }
  });

  lightGallery(document.querySelector('.js-promo-main'), {
    selector: ".product-main-promo__img-wrap"
  });

  lightGallery(document.querySelector('.js-lgallery'));

  lightGallery(document.querySelector('.meating-carousel'), {
    selector: ".meating-promo"
  });

  /* Drift Zoom */
  if ( window.matchMedia('(min-width: 992px)').matches ) {

    let driftPaneContainer = document.querySelector(".product-main-promo__zoom-pane");
    let driftInstance = null;

    initDriftZoom(document.querySelector(".js-promo-main .swiper-slide-active img"), driftPaneContainer);

    galleryMain.on('slideChange', function() {
      setTimeout(function() {

        driftInstance.destroy();
        initDriftZoom(document.querySelector(".js-promo-main .swiper-slide-active img"), driftPaneContainer);
      
      });
    });

    function initDriftZoom(driftTriggerElement, driftPaneContainer) {
      if ( !driftTriggerElement ) return;
      
      driftInstance = new Drift(driftTriggerElement, {
        paneContainer: driftPaneContainer,
        hoverBoundingBox: true,
        zoomFactor: 4,
        inlinePane: false,
        handleTouch: false
      });
    }

  }
  /* Drift Zoom */
  /* ------------ Product-Main ------------ */

  /* ------------ Counter ------------ */
  document.querySelectorAll('.counter--add').forEach(function(item) {

    item.addEventListener('click', function(e) {
      let input = this.closest('.counter').querySelector('input[type="tel"]');
      let value = input.value;

      if ( !parseInt(value) === value ) return;

      input.value = parseInt(value) + 1;
    });

  });

  document.querySelectorAll('.counter--remove').forEach(function(item) {

    item.addEventListener('click', function(e) {
      let input = this.closest('.counter').querySelector('input[type="tel"]');
      let value = input.value;

      if ( !parseInt(value) === value ) return;

      if (value > 1) {
        input.value = parseInt(value) - 1;
      }
    });

  });
  /* ------------ Counter ------------ */  
});

svg4everybody({});

function scrollWidth() {
  let div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);
  return scrollWidth;
}

function addOverlay() {
  let overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);
}

function removeOverlay() {
  let overlay = document.querySelector('.overlay')

  if (overlay) overlay.remove();
}

/* ------------ Video FROM YOUTUBE!!! ------------ */
function init() {
  var vidDefer = document.getElementsByTagName('iframe');
  for (var i=0; i<vidDefer.length; i++) {
    if(vidDefer[i].getAttribute('data-src')) {
      vidDefer[i].setAttribute('src',vidDefer[i].getAttribute('data-src'));
    }
  }
}

window.onload = init;
/* ------------ Video FROM YOUTUBE!!! ------------ */