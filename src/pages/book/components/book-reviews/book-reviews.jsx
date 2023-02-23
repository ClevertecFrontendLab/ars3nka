import { useState } from 'react';
import classNames from 'classnames';

import { ReactComponent as ReviewButton } from '../../img/review_open.svg';
import { Review } from '../book-review/book-review';

import './book-reviews.css';

export const BookPageReviews = ({ comments }) => {
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  console.log('comments array', comments);

  const commentsList = comments?.map((comment) => (
    <Review
      firstName={comment.user.firstName}
      lastName={comment.user.lastName}
      date={comment.createdAt.slice(0, 10)}
      rating={comment.rating}
      text={comment.text}
    />
  ));

  return (
    <div className='book-about book-reviews'>
      <div className='book-about book-reviews-header'>
        <h5>Отзывы</h5>
        <p className='book-about book-reviews-count'>{comments ? comments.length : 0}</p>
        <ReviewButton
          className={classNames('book-about book-reviews-button', { bookReviewsButtonOpen: isReviewsOpen })}
          onClick={() => setIsReviewsOpen(!isReviewsOpen)}
          data-test-id='button-hide-reviews'
        />
      </div>

      <div className='line book-line' />

      <div className={classNames('reviews', { hide: !isReviewsOpen })}>{commentsList}</div>
      <div className='review-button'>
        <button type='button' className='booking-button book-button available' data-test-id='button-rating'>
          оценить книгу
        </button>
      </div>
    </div>
  );
};
