const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const VALID_SAMPLE = /^#[a-zа-я0-9]{1,19}$/i;
const errorMessages = {
  MAX_COUNT: `Максимальное число хэштегов ${MAX_HASHTAG_COUNT}`,
  UNIQUE: 'Хэштег должен быть уникальным.',
  INVALID_SAMPLE: 'Хэштег должен начинаться с \'#\' и может содержать только символы от \'A-z\', \'А-я\', цифры \'0-9\'. Хэштеги должны быть разделены пробелом.',
  MAX_COMMENT_LENGTH: 'Комментарий не может быть длиннее 140 символов.'
};

const form = document.querySelector('.img-upload__form');
const imageFormHashtagInput = document.querySelector('.text__hashtags');
const imageFormCommentInput = document.querySelector('.text__description');

const hashtagNormalize = (hashtagsString) => hashtagsString.trim().toLowerCase().split(' ').filter((element) => element !== '');


const hashtagSampleChecker = (value) => {
  if (value === '') {
    return true;
  }

  return hashtagNormalize(value).every((hashtag) => VALID_SAMPLE.test(hashtag));
};

const hashtagUniqueСhecker = (value) => {
  const uniqueHashtags = new Set(hashtagNormalize(value));
  return hashtagNormalize(value).length === uniqueHashtags.size;
};

const hashtagCountChecker = (value) => hashtagNormalize(value).length <= MAX_HASHTAG_COUNT;

const lengthCommentChecker = (value) => value.length < MAX_COMMENT_LENGTH;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

pristine.addValidator(
  imageFormHashtagInput,
  hashtagUniqueСhecker,
  errorMessages.UNIQUE,
  1,
  true
);

pristine.addValidator(
  imageFormHashtagInput,
  hashtagSampleChecker,
  errorMessages.INVALID_SAMPLE,
  2,
  true
);

pristine.addValidator(
  imageFormHashtagInput,
  hashtagCountChecker,
  errorMessages.MAX_COUNT,
  3,
  true
);

pristine.addValidator(
  imageFormCommentInput,
  lengthCommentChecker,
  errorMessages.MAX_COMMENT_LENGTH,
  1,
  true
);

export { pristine };
