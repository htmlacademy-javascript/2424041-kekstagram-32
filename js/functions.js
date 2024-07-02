function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

function isPalindrome (string) {
  const cleanString = string.toLowerCase().replaceAll(' ', '');
  let newString = '';

  for (let i = cleanString.length - 1; i >= 0; i--) {
    newString += cleanString[i];
  }

  return cleanString === newString;
}

function getNumber (string) {
  let result = '';

  const newString = string.toString();

  for (let i = 0; i < newString.length; i++) {
    const char = parseInt(newString[i], 10);

    if (!Number.isNaN(char)) {
      result += newString[i];
    }
  }

  if (result === '') {
    return NaN;
  }

  return parseInt(result, 10);
}

checkStringLength('Привет Мир!', 20);
checkStringLength('Привет Мир!', 10);

isPalindrome('Лёша на полке клопа нашёл ');
isPalindrome('Лёша на полке клопа нашёл! ');

getNumber('10 тарелок');
getNumber('Купи 3 килограмма муки');
getNumber('А я томат');
getNumber(2023);
getNumber(-1);
getNumber(1.5);
getNumber('агент 007');
