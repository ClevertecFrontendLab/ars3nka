import React from 'react';
import Lottie from 'react-lottie';
import { Outlet } from 'react-router-dom';

import { Error } from '../../components/error/error';
import * as animationData from '../../components/loader/loader.json';
import { useGetBooksQuery, useGetCategoriesQuery } from '../../redux/api';
import { Menu } from '../main/components/menu/menu';

export const LayoutMainPage = () => {
  const { isLoading: booksLoading, error: booksError, isFetching: bookFetching } = useGetBooksQuery();

  const { isLoading: categoriesLoading, error: categoriesError } = useGetCategoriesQuery();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };

  if ((bookFetching || booksLoading || categoriesLoading) && (!booksError || !categoriesError)) {
    return (
      <div className='loader' data-test-id='loader'>
        <Lottie options={defaultOptions} width={150} height={150} />
      </div>
    );
  }

  return (
    <section className='main-wrapper'>
      <main>
        <div className='main'>
          <div className='main-left'>
            <Menu test='navigation' />
          </div>
          {/* {window.innerWidth >= 1200 ? <Menu test='navigation' /> : null} */}
          {booksError || categoriesError ? (
            <React.Fragment>
              <Error />
              <Outlet />
            </React.Fragment>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </section>
  );
};
