const checkStringLength = function (string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  }

  return false;
};

const isPalindrome = function (string) {
  let cleanString = string.replaceAll(' ', '');
  let newString = '';

  cleanString = cleanString.toLowerCase(string.replaceAll(' ', ''));

  for (let i = cleanString.length - 1; i >= 0; i--) {
    newString += cleanString[i];
  }

  if (cleanString === newString) {
    return true;
  }

  return false;
};

const getNumber = function (string) {
  let result = '';

  string = string.toString();

  for (let i = 0; i < string.length; i++) {
    const char = parseInt(string[i], 10);

    if (!Number.isNaN(char)) {
      result += string[i];
    }
  }

  if (result === '') {
    return NaN;
  }

  return result;
};

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
