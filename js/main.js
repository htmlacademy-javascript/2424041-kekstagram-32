const NAMES = [
  'Алексей',
  'Виктория',
  'Дмитрий',
  'Екатерина',
  'Иван',
  'Мария',
  'Павел',
  'София',
  'Тимофей',
  'Юлия'];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = {
  photo1: 'Вид из окна моего отеля!',
  photo2: 'Идем на пляж.',
  photo3: 'Нашли укромное место с видом на пляж',
  photo4: 'Сегодня загараем и делаем фотки!',
  photo5: 'Подача блюд в местном ресторане)',
  photo6: 'Увидел во дворе такую красавицу!',
  photo7: 'Сажусь на диету!',
  photo8: 'Наготовили морса!',
  photo9: 'А у нас сегодня была экстренная посадка на пляже.',
  photo10: 'Нашла куртой органайзер для обуви на маркетплейсе.',
  photo11: 'Дорога на пляж.',
  photo12: 'Купил новую машину!',
  photo13: 'Легкий перекус на Бали',
  photo14: 'У нашего Барсика фотосессия',
  photo15: 'Классные тапки!',
  photo16: 'Сделал фото пока летел.',
  photo17: 'Наконец-то побывал на концерте.',
  photo18: 'Был сегодня на выставке ретро автомобилей.',
  photo19: 'О! Мне такие надо!',
  photo20: 'Внутрений двор нашего отеля.',
  photo21: 'Сегодня буду готовить такую вкусняху!',
  photo22: 'Снял красивый закат.',
  photo23: 'Сфоткала вот такого красавца недалеко от пляжа.',
  photo24: 'Ура! Наконец-то побывал на их концерте!',
  photo25: 'Побывали на сафари!',
};

function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function getRandomUniqueInteger(min, max) {
  const valuesList = [];

  return function () {
    let currentValue = getRandomInteger(min, max);

    while (valuesList.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    valuesList.push(currentValue);

    return currentValue;
  };
}

function createIdGenerator() {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;

    return lastGeneratedId;
  };
}

const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();

function createPost() {
  const randomInteger = getRandomUniqueInteger(1, 25);
  const randomUrl = `img/photos/${randomInteger()}.svg`;
  const photoDescription = `photo${randomInteger()}`;

  return {
    id: generatePhotoId(),
    url: randomUrl,
    description: DESCRIPTIONS[photoDescription],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
    // Или через функцию создания списка.
    // comments: createCommentsList(getRandomInteger(0, 30)),
  };
}

function createComment() {
  const randomName = NAMES[getRandomInteger(0, NAMES.length - 1)];
  const randomMessage = MESSAGES[getRandomInteger(0, MESSAGES.length - 1)];
  const randomAvatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;

  return {
    id: generateCommentId(),
    avatar: randomAvatar,
    message: randomMessage,
    name: randomName,
  };
}

const createPostsList = Array.from({length: 25}, createPost);
createPostsList();

// Первая реализация создания массива постов и коментариев, позже вспомнил про метод массивов, решил не удалять.

// function createPostsList(count) {
//   const postsList = [];

//   for (let i = 1; i <= count; i++) {
//     postsList.push(createPost());
//   }

//   return postsList;
// }

// function createCommentsList(count) {
//   const commentsList = [];

//   for (let i = 1; i <= count; i++) {
//     commentsList.push(createComment());
//   }

//   return commentsList;
// }
