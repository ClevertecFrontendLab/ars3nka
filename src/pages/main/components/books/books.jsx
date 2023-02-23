import { Book } from './components/book/book';

import './books.css';

export const Books = ({ books, inputText }) => {
  const booksElements = books.map((book) => (
    <Book
      image={book.image}
      rating={book.rating}
      title={book.title}
      authors={book.authors}
      booking={book.booking}
      id={book.id}
      category={book.categories}
      inputText={inputText}
    />
  ));

  return <div className='books'>{booksElements}</div>;
};
