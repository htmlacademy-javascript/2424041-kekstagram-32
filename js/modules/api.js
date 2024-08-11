const SERVER_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const paths = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const MESSAGE_TIME = 5000;

const showGettingDataError = () => {
  const dataErrorMessage = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);
  document.body.appendChild(dataErrorMessage);

  setTimeout(() => {
    dataErrorMessage.remove();
  }, MESSAGE_TIME);
};

const getData = (callback) => {
  fetch(`${SERVER_URL}${paths.GET_DATA}`)
    .then((response) => {
      if(!response.ok) {
        throw new Error();
      } else {
        return response.json();
      }
    })
    .then((postsArray) => {
      callback(postsArray);
    }) .catch(showGettingDataError);
};

const sendData = (body) => fetch(
  `${SERVER_URL}${paths.SEND_DATA}`,
  {
    method: 'POST',
    body,
  }
);

export { getData, sendData };
