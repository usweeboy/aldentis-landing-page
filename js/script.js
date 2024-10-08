document.addEventListener("DOMContentLoaded", function() {
  let lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyVideoObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          for (let source in video.target.children) {
            let videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});


const ymap = document.getElementById("ymap");

const mapObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const lazyMap = document.getElementById('ymap-lazy');

      lazyMap.setAttribute("src", lazyMap.getAttribute("data-src"));
      lazyMap.removeAttribute("data-src");

      observer.unobserve(entry.target);
    }
  });
}, {});

mapObserver.observe(ymap);


const employeesSlider = new Swiper('.employees-slider', {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 35,
  navigation: {
    nextEl: '.employees-slider-btn-next',
    prevEl: '.employees-slider-btn-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  pagination: {
    el: '.employees-slider__pagination',
    type: 'fraction',
  },
  breakpoints: {  
    '0': {
      slidesPerView: 1,
      spaceBetween: 25,
    },
    '576': {
      slidesPerView: 2,
      spaceBetween: 28,
    },
    '1040': {
      slidesPerView: 3,
      spaceBetween: 32,
    }
  },
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});


let header = document.querySelector('.header-sticky');

window.addEventListener('scroll', () => {
  let scrollPosition = window.scrollY;

  if (scrollPosition > 40) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
});


const modalController = ({modal, btnOpen, btnClose, time = 300}) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

  modalElem.style.cssText = `
    display: grid;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms ease-in-out;
  `;

  const closeModal = event => {
    const target = event.target;

    if (
      target === modalElem ||
      (btnClose && target.closest(btnClose)) ||
      event.code === 'Escape'
      ) {
      
      modalElem.style.opacity = 0;

      setTimeout(() => {
        modalElem.style.visibility = 'hidden';
      }, time);

      window.removeEventListener('keydown', closeModal);
    }
  }

  const openModal = () => {
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    window.addEventListener('keydown', closeModal)
  };

  buttonElems.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  modalElem.addEventListener('click', closeModal);
};

modalController({
  modal: '.modal-worktime',
  btnOpen: '.modal-worktime__open',
  btnClose: '.modal__close',
});


Cocoen.create(document.querySelector('.cocoen'));


const tabsBtn = document.querySelectorAll('.tab-btn');
const tabsContent = document.querySelectorAll('.tab-content');

const openTabContent = (e) => {
  const tabTarget = e.currentTarget;
  const tab = tabTarget.dataset.tab;

  tabsBtn.forEach((btn) => {
    btn.classList.remove('active');
  })

  tabsContent.forEach((content) => {
    content.classList.remove('active');
  })

  tabTarget.classList.add('active');
  document.querySelector(`#${tab}`).classList.add('active');
}

tabsBtn.forEach((tab) => {
  tab.addEventListener('click', openTabContent)
})


const faqBtnShowMore = document.getElementById('faq-btn-show-more');

faqBtnShowMore.addEventListener('click', () => {
  document.querySelectorAll('.faq__item').forEach(item => (
    item.classList.remove('hidden')
  ));

  faqBtnShowMore.style.display = 'none';
});

const faqTextShowMore = document.querySelectorAll('.faq__answer-show__more').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.previousSibling.previousSibling;
    text.classList.add('long');

    btn.style.display = 'none';
  })
})

Fancybox.bind('[data-fancybox="gallery"]', {});


// Маска для номера телефона
document.addEventListener("DOMContentLoaded", function () {
  let phoneInputs = document.querySelectorAll('input[data-tel-input]');

  let getInputNumbersValue = function (input) {
    return input.value.replace(/\D/g, '');
  }

  let onPhonePaste = function (e) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input);
    let pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      let pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
        return;
      }
    }
  }

  let onPhoneInput = function (e) {
    let input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        formattedInputValue = "";

    if (!inputNumbersValue) {
      return input.value = "";
    }

    if (input.value.length != selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
      let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
      formattedInputValue = input.value = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
          formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
          formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
          formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
          formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
    } else {
        formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
  }

  let onPhoneKeyDown = function (e) {
    let inputValue = e.target.value.replace(/\D/g, '');
    if (e.keyCode == 8 && inputValue.length == 1) {
        e.target.value = "";
    }
  }

  for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('input', onPhoneInput, false);
    phoneInput.addEventListener('paste', onPhonePaste, false);
  }
});