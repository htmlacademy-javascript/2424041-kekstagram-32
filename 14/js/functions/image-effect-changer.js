const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');
const upploadPreview = document.querySelector('.img-upload__preview img');

const Effects = {
  'effect-chrome': {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1
    },
    filter: 'grayscale',
    unit: ''
  },
  'effect-sepia': {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1
    },
    filter: 'sepia',
    unit: ''
  },
  'effect-marvin': {
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1
    },
    filter: 'invert',
    unit: '%'
  },
  'effect-phobos': {
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1
    },
    filter: 'blur',
    unit: 'px'
  },
  'effect-heat': {
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1
    },
    filter: 'brightness',
    unit: ''
  }
};

let chosenEffect = 'effect-none';
sliderContainer.classList.add('visually-hidden');

const effectSlider = noUiSlider.create(slider, {
  start: 100,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100
  },
  step: 0.1,
  format: {
    to: (value) => Number(value),
    from: (value) => Number(value),
  }
});


function applyEffect(item) {
  chosenEffect = item.getAttribute('id');

  if(chosenEffect === 'effect-none') {
    sliderContainer.classList.add('visually-hidden');
    effectSlider.reset();
    upploadPreview.style.removeProperty('filter');
  } else {
    sliderContainer.classList.remove('visually-hidden');
    effectSlider.updateOptions(Effects[chosenEffect].options);
  }
}

function updateEffect() {
  const currentValue = effectSlider.get();
  effectValue.value = currentValue;

  if (chosenEffect !== 'effect-none') {
    upploadPreview.style.filter = `${Effects[chosenEffect].filter}(${currentValue}${Effects[chosenEffect].unit})`;
  }
}

effectSlider.on('update', updateEffect);

export { applyEffect, effectSlider };
