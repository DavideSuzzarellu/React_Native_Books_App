import { useContext } from "react";
import { BooksContext } from '../context/BooksContext'; 
import { BookProps } from "../config/types"

export const getAllBooks = async () => {
  try {
    const response = await fetch('http://192.168.1.84:3000/books');
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error retrieving all books:', error);
    throw error; 
  }
};

export const putBook = async (updateBook: BookProps, id: string) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateBook),
  };

  try {
    const response = await fetch(`http://192.168.1.84:3000/books/${id}`, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    await getAllBooks();
    return data.book;
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

export const bookDetails = async (id: string) => {
  try {
    const response = await fetch(`http://192.168.1.84:3000/books/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error; 
  }
};

export const postBook = async (book: BookProps) => {
  const options: {} = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  };

  try {
    const response = await fetch('http://192.168.1.84:3000/books', options);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json(); 
    await getAllBooks();
    return data.book;
  } catch (error) {
    console.error('Error posting book:', error);
    throw error; 
  }
};

export const deleteBook = async (id: string) => {
  const options: {} = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  try {
    const response = await fetch(`http://192.168.1.84:3000/books/${id}`, options);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    await getAllBooks();
    return data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
