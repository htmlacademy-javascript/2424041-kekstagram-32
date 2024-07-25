import { DESCRIPTIONS } from './database.js';
import { getRandomInteger, getRandomUniqueInteger, createIdGenerator } from './integer-generator.js';
import { createCommentsList } from './comments-generator.js';

const generatePhotoId = createIdGenerator();
const generateUrlInteger = getRandomUniqueInteger(1, 25);

function createPost() {
  const randomUrl = `photos/${generateUrlInteger()}.jpg`;
  const photoDescription = DESCRIPTIONS[getRandomUniqueInteger(0, DESCRIPTIONS.length - 1)()];

  return {
    id: generatePhotoId(),
    url: randomUrl,
    description: photoDescription,
    likes: getRandomInteger(15, 200),
    comments: createCommentsList(),
  };
}

function createPostsList () {
  return Array.from({ length: 25 }, createPost);
}

export { createPostsList };
