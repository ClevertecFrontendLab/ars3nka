import classNames from 'classnames';

import sortAscending from './img/icon-sort-ascending.svg';
import sortDescending from './img/icon-sort-descending.svg';
import { NavInput } from './nav-input/nav-input';

import './navigation-list.css';

export const NavigationList = ({
  changeInputText,
  inputText,
  toggleSortBooksByRating,
  isSortBooksDescendingOrder,
  setBookViewList,
  setBookViewWindow,
  isBookList,
}) => (
  <div className='navigation-list'>
    <div className='navigation-list-left'>
      <NavInput changeInputText={changeInputText} inputText={inputText} />
      <button
        type='button'
        className='button-style sort'
        onClick={toggleSortBooksByRating}
        data-test-id='sort-rating-button'
      >
        <img src={isSortBooksDescendingOrder ? sortAscending : sortDescending} alt='' />
        <p>По рейтингу</p>
      </button>
    </div>
    <div className='navigation-list-right'>
      <button
        type='button'
        className={classNames('sort-button view-window', { sortButtonActive: !isBookList })}
        data-test-id='button-menu-view-window'
        onClick={setBookViewWindow}
      >
        <svg width='18' height='19' viewBox='0 0 18 19' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M0.818182 0.75415C0.366312 0.75415 0 1.12046 0 1.57233V8.11779C0 8.56966 0.366312 8.93597 0.818182 8.93597H7.36364C7.81551 8.93597 8.18182 8.56966 8.18182 8.11779V1.57233C8.18182 1.12046 7.81551 0.75415 7.36364 0.75415H0.818182ZM1.63636 7.2996V2.39051H6.54545V7.2996H1.63636ZM10.6364 0.75415C10.1845 0.75415 9.81818 1.12046 9.81818 1.57233V8.11779C9.81818 8.56966 10.1845 8.93597 10.6364 8.93597H17.1818C17.6337 8.93597 18 8.56966 18 8.11779V1.57233C18 1.12046 17.6337 0.75415 17.1818 0.75415H10.6364ZM11.4545 7.2996V2.39051H16.3636V7.2996H11.4545ZM0 11.3905C0 10.9386 0.366312 10.5723 0.818182 10.5723H7.36364C7.81551 10.5723 8.18182 10.9386 8.18182 11.3905V17.936C8.18182 18.3878 7.81551 18.7542 7.36364 18.7542H0.818182C0.366312 18.7542 0 18.3878 0 17.936V11.3905ZM1.63636 12.2087V17.1178H6.54545V12.2087H1.63636ZM10.6364 10.5723C10.1845 10.5723 9.81818 10.9386 9.81818 11.3905V17.936C9.81818 18.3878 10.1845 18.7542 10.6364 18.7542H17.1818C17.6337 18.7542 18 18.3878 18 17.936V11.3905C18 10.9386 17.6337 10.5723 17.1818 10.5723H10.6364ZM11.4545 17.1178V12.2087H16.3636V17.1178H11.4545Z'
          />
        </svg>
      </button>
      <button
        type='button'
        className={classNames('sort-button view-list', { sortButtonActive: isBookList })}
        data-test-id='button-menu-view-list'
        onClick={setBookViewList}
      >
        <svg width='24' height='25' viewBox='0 0 24 25' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M2 12.7542C2 12.2019 2.44772 11.7542 3 11.7542H21C21.5523 11.7542 22 12.2019 22 12.7542C22 13.3064 21.5523 13.7542 21 13.7542H3C2.44772 13.7542 2 13.3064 2 12.7542Z'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M2 6.75415C2 6.20187 2.44772 5.75415 3 5.75415H21C21.5523 5.75415 22 6.20187 22 6.75415C22 7.30644 21.5523 7.75415 21 7.75415H3C2.44772 7.75415 2 7.30644 2 6.75415Z'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M2 18.7542C2 18.2019 2.44772 17.7542 3 17.7542H21C21.5523 17.7542 22 18.2019 22 18.7542C22 19.3064 21.5523 19.7542 21 19.7542H3C2.44772 19.7542 2 19.3064 2 18.7542Z'
          />
        </svg>
      </button>
    </div>
  </div>
);

export const sortBooksByRating = (books, isSortBooksDescendingOrder) => {
  const booksWithRating = [];
  const booksWithoutRating = [];

  books.forEach((book) => (book.rating ? booksWithRating.push(book) : booksWithoutRating.push(book)));

  if (isSortBooksDescendingOrder) {
    return [...booksWithRating.sort((a, b) => b.rating - a.rating), ...booksWithoutRating];
  }

  return [...booksWithoutRating, ...booksWithRating.sort((a, b) => a.rating - b.rating)];
};
