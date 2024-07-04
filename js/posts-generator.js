import { DESCRIPTIONS } from './database';
import { getRandomInteger, getRandomUniqueInteger, createIdGenerator } from './integer-generator';
import { createCommentsList } from './comments-generator';

const generatePhotoId = createIdGenerator();

function createPost() {
  const randomUrl = `img/photos/${getRandomUniqueInteger(1, 25)()}.svg`;
  const photoDescription = DESCRIPTIONS[getRandomUniqueInteger(0, DESCRIPTIONS.length - 1)()];

  return {
    id: generatePhotoId(),
    url: randomUrl,
    description: photoDescription,
    likes: getRandomInteger(15, 200),
    comments: createCommentsList(),
  };
}

const createPostsList = function () {
  return Array.from({ length: 25 }, createPost);
};

export { createPostsList };
