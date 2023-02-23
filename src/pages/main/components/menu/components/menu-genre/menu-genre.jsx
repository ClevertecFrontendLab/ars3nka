import { NavLink } from 'react-router-dom';
import { useGetBooksQuery } from '../../../../../../redux/api.js';

import './menu-genre.css';

export const MenuGenre = ({ name, path, id, test }) => {
  const { data: books } = useGetBooksQuery();

  let amount = 0;

  if (books) {
    const filtedBooks = books.filter((el) => el.categories.includes(name));
    amount = filtedBooks.length;
  }

  return (
    <NavLink to={`/books/${path}`} className={({ isActive }) => (isActive ? 'menu-genre-active' : null)}>
      <li className='menu-genre' key={id}>
        <button type='button'>
          <div className='menu-genre-genre'>
            <span data-test-id={`${test}-${path}`}>{name}</span>
            <p className='menu-genre-amount' data-test-id={`${test}-book-count-for-${path}`}>
              {amount}
            </p>
          </div>
        </button>
      </li>
    </NavLink>
  );
};
