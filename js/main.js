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

const DESCRIPTIONS = [
  'Вид из окна моего отеля!',
  'Идем на пляж.',
  'Нашли укромное место с видом на пляж',
  'Сегодня загараем и делаем фотки!',
  'Подача блюд в местном ресторане)',
  'Увидел во дворе такую красавицу!',
  'Сажусь на диету!',
  'Наготовили морса!',
  'А у нас сегодня была экстренная посадка на пляже.',
  'Нашла куртой органайзер для обуви на маркетплейсе.',
  'Дорога на пляж.',
  'Купил новую машину!',
  'Легкий перекус на Бали',
  'У нашего Барсика фотосессия',
  'Классные тапки!',
  'Сделал фото пока летел.',
  'Наконец-то побывал на концерте.',
  'Был сегодня на выставке ретро автомобилей.',
  'О! Мне такие надо!',
  'Внутрений двор нашего отеля.',
  'Сегодня буду готовить такую вкусняху!',
  'Снял красивый закат.',
  'Сфоткала вот такого красавца недалеко от пляжа.',
  'Ура! Наконец-то побывал на их концерте!',
  'Побывали на сафари!',
];

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
  const randomUrl = `img/photos/${getRandomUniqueInteger(1, 25)()}.svg`;
  const photoDescription = DESCRIPTIONS[getRandomUniqueInteger(0, DESCRIPTIONS.length - 1)()];

  return {
    id: generatePhotoId(),
    url: randomUrl,
    description: photoDescription,
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
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
// eslint-disable-next-line
console.log(createPostsList);
