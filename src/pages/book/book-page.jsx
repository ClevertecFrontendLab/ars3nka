import React from 'react';
import Lottie from 'react-lottie';
import { useParams } from 'react-router-dom';

import { BookingButton } from '../../components/button/button';
import { Error } from '../../components/error/error';
import * as animationData from '../../components/loader/loader.json';
import { useGetBookByIdQuery } from '../../redux/api';

import { BookPageInfoTable } from './components/book-info-table/book-info-table';
import { BookPageRating } from './components/book-rating/book-rating';
import { BookPageReviews } from './components/book-reviews/book-reviews';
import { BookSwiper } from './components/book-swiper/book-swiper';
import { Breadcrumbs } from './components/breadcrumbs/breadcrumbs';

import './book-page.css';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export const BookPage = () => {
  const params = useParams();
  const { id } = params;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };

  const { data: book, isLoading, error } = useGetBookByIdQuery(id);

  // console.log('Книга:', book);

  if (isLoading && !error) {
    return (
      <div className='loader' data-test-id='loader'>
        <Lottie options={defaultOptions} width={150} height={150} />
      </div>
    );
  }

  return (
    <section className='main-wrapper book-page'>
      <main>
        <Breadcrumbs params={params} book={book} />
        {error ? (
          <Error />
        ) : (
          <React.Fragment>
            <div className='main'>
              <div className='main-left'>
                <div className='book-picture'>
                  <BookSwiper gallery={book.images} />
                </div>
              </div>
              <div className='main-right'>
                <h3 className='book-title' data-test-id='book-title'>
                  {book.title}
                </h3>
                <h5 className='book-author'>{book.authors}</h5>
                <BookingButton className='booking-button book-button available' text='Забронировать' />
                <div className='book-about'>
                  <h5>О книге</h5>
                  <p className='book-description'>{book.description}</p>
                </div>
              </div>
            </div>
            <div className='book-bottom'>
              <BookPageRating rating={book.rating} />
              <BookPageInfoTable book={book} />
              <BookPageReviews comments={book.comments} />
            </div>
          </React.Fragment>
        )}
      </main>
    </section>
  );
};
