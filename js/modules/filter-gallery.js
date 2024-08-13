import { thumbnailsRender } from './thumbnails-render.js';
import { debounce } from './functions.js';

const galleryFilters = document.querySelector('.img-filters');

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  HOT: 'filter-discussed'
};

const getRandomPosts = (arr) => arr.sort(() => Math.random() - 0.5).slice(0, 10);

const getHotPosts = (arr) => arr.sort((postA, postB) => postB.comments.length - postA.comments.length);

const filterGallery = (postsOriginArray = []) => {
  const posts = postsOriginArray.slice();

  thumbnailsRender(postsOriginArray);

  const debouncedThumbnailsRender = debounce((filteredPosts) => thumbnailsRender(filteredPosts));

  if(postsOriginArray.length > 0) {
    galleryFilters.classList.remove('img-filters--inactive');
  }

  galleryFilters.addEventListener('click', (evt) => {
    if (evt.target.closest('.img-filters__button')) {
      const button = evt.target;
      let activeButton = document.querySelector('.img-filters__button--active');
      const isActive = button.classList.contains('img-filters__button--active');

      if (!isActive) {
        activeButton.classList.remove('img-filters__button--active');
        button.classList.add('img-filters__button--active');
        activeButton = button;
      }

      const chosenFilter = button.id;

      if (chosenFilter === Filters.DEFAULT) {
        debouncedThumbnailsRender(postsOriginArray);
      }

      if (chosenFilter === Filters.RANDOM) {
        debouncedThumbnailsRender(getRandomPosts(posts));
      }

      if (chosenFilter === Filters.HOT) {
        debouncedThumbnailsRender(getHotPosts(posts));
      }
    }
  });
};

export { filterGallery };
