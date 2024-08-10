const scaleValue = document.querySelector('.scale__control--value');
const upploadPreview = document.querySelector('.img-upload__preview img');

const VALUE_STEP = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const DEFAULT_VALUE = 100;

function imageResize(value) {
  upploadPreview.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
}

function scaleBiggerClick() {
  const currentValue = parseInt(scaleValue.value, 10);
  let targetValue = currentValue;

  if (currentValue >= MIN_VALUE && currentValue < MAX_VALUE) {
    targetValue = currentValue + VALUE_STEP;
  }

  imageResize(targetValue);
}

function scaleSmallerClick() {
  const currentValue = parseInt(scaleValue.value, 10);
  let targetValue = currentValue;

  if (currentValue <= MAX_VALUE && currentValue > MIN_VALUE) {
    targetValue = currentValue - VALUE_STEP;
  }

  imageResize(targetValue);
}

function resetImageSize () {
  imageResize(DEFAULT_VALUE);
}

export { resetImageSize, scaleSmallerClick, scaleBiggerClick};
