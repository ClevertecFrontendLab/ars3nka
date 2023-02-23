/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetBooksQuery, useGetCategoriesQuery } from '../../redux/api';

import { Books } from './components/books/books';
import { BooksList } from './components/books/books-list';
import { NavigationList, sortBooksByRating } from './components/navigation-list/navigation-list';

import './main-page.css';

export const MainPage = () => {
  const { isLoading: booksLoading, error: booksError, data: books } = useGetBooksQuery();
  const { isLoading: categoriesLoading, error: booksCategoriesError, data: booksCategories } = useGetCategoriesQuery();

  if (booksError || booksCategoriesError) {
    return null;
  }

  const [booksSorted, setBooksSorted] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isBookList, setBookList] = useState(false);
  const [isSortBooksDescendingOrder, setIsSortBooksDescendingOrder] = useState(true);

  const params = useParams();

  const setBookViewList = () => {
    setBookList(true);
  };

  const setBookViewWindow = () => {
    setBookList(false);
  };

  const toggleSortBooksByRating = () => {
    setIsSortBooksDescendingOrder(!isSortBooksDescendingOrder);
  };

  const changeInputText = (value) => {
    setInputText(value);
  };

  useEffect(() => {
    let selectedCategoryName = [];

    if (!booksLoading && !categoriesLoading && !booksError && !categoriesLoading) {
      selectedCategoryName = sortBooksByRating(books, isSortBooksDescendingOrder);
      setBooksSorted(selectedCategoryName);
    }

    if (books && booksCategories && !categoriesLoading && params.category !== 'all') {
      const categoryName = booksCategories.find((el) => el.path === params.category);

      selectedCategoryName = books.filter((el) => el.categories.includes(categoryName.name));
      setBooksSorted(selectedCategoryName);
    }

    if (inputText) {
      const filtredBooks = selectedCategoryName.filter((el) =>
        el.title.toLowerCase().includes(inputText.toLowerCase())
      );

      setBooksSorted(filtredBooks);
    }

    console.log('USE EFFECT: FILTER BOOKS');
  }, [
    books,
    booksCategories,
    booksError,
    booksLoading,
    categoriesLoading,
    inputText,
    isSortBooksDescendingOrder,
    params.category,
  ]);

  return (
    <div className='main-right'>
      <NavigationList
        changeInputText={changeInputText}
        inputText={inputText}
        toggleSortBooksByRating={toggleSortBooksByRating}
        isSortBooksDescendingOrder={isSortBooksDescendingOrder}
        setBookViewList={setBookViewList}
        setBookViewWindow={setBookViewWindow}
        isBookList={isBookList}
      />

      {booksSorted?.length ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <React.Fragment>
          {isBookList ? <BooksList books={booksSorted} /> : <Books books={booksSorted} inputText={inputText} />}
        </React.Fragment>
      ) : (
        <div className='empty-data-text'>
          {inputText ? (
            <p data-test-id='search-result-not-found'>По запросу ничего не найдено</p>
          ) : (
            <p data-test-id='empty-category'>В этой категории книг ещё нет</p>
          )}
        </div>
      )}
    </div>
  );
};
