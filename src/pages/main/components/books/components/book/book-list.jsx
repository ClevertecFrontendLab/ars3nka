import { NavLink } from 'react-router-dom';

import { BookingButton } from '../../../../../../components/button/button';
import { BASE_URL } from '../../../../../../redux/api';

import { StarRating } from './components/star-rating/star-rating';
import altImage from './img/BookAltImage.png';

import './book-list.css';

export const BookList = ({ image, rating, title, authors, booking, id, category }) => (
  <NavLink to={`/books/${category}/${id}`}>
    <div className='book-list' data-test-id='card'>
      <div className='book-picture book-list-picture'>
        <img src={image ? BASE_URL + image.url : altImage} alt='Book' />
      </div>
      <div className='book-list-left-container'>
        <div className='book-list-title'>{title}</div>
        <div className='book-list-author'>{authors}</div>
        <div className='book-list-bottom'>
          <div>{typeof rating === 'string' ? rating : <StarRating rating={rating} />}</div>
          {booking === null ? (
            <BookingButton className='booking-button book-list-button available' text='Забронировать' />
          ) : (
            <BookingButton className='booking-button book-list-button' text='Забронирована' />
          )}
        </div>
      </div>
    </div>
  </NavLink>
);
