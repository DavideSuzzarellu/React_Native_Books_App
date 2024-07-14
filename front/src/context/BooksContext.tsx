import React, { createContext, useState, ReactNode } from 'react';
import { BookProps } from '../config/types';
import { BooksContextProps } from '../config/types';

const initialBooksContextValue: BooksContextProps = {
  books: [],
  setBooks: () => {}
};

export const BooksContext = createContext<BooksContextProps>(initialBooksContextValue);

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<BookProps[]>([]);

  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
};
