import { Link } from 'react-router-dom';

import { useGetBooksQuery, useGetCategoriesQuery } from '../../../../redux/api';

export const Breadcrumbs = ({ params, book }) => {
  const { data: booksCategories = [] } = useGetCategoriesQuery();
  const { refetch } = useGetBooksQuery();
  const categoryName = booksCategories?.find(({ path }) => path === params.category)?.name;

  return (
    <div className='book-route'>
      <Link to={`/books/${params.category}`} onClick={refetch}>
        <span data-test-id='breadcrumbs-link'>{categoryName ? categoryName : 'Все книги'}</span>
        <span> / </span>
        <span data-test-id='book-name'>{book?.title}</span>
      </Link>
    </div>
  );
};
