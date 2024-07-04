import { NAMES, MESSAGES } from './database';
import { getRandomInteger, createIdGenerator } from './integer-generator';

const generateCommentId = createIdGenerator();

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

const createCommentsList = function () {
  return Array.from({ length: getRandomInteger(0, 30) }, createComment);
};

export { createCommentsList };
