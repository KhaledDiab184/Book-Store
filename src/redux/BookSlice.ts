import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bookDetails } from "../types/Book";

type BookState = {
  books: (bookDetails & { addedToCart: boolean })[]; // Add 'addedToCart' property
};

const initialValue: BookState = {
  books: [],
};

export const BookSlice = createSlice({
  name: "books",
  initialState: initialValue,
  reducers: {
    addBook: (state, action: PayloadAction<bookDetails>) => {
      
      const bookInCart = state.books.find((book) => book.id === action.payload.id);
      
      if (!bookInCart) {
       
        state.books.push({ ...action.payload, addedToCart: true });
      }
    },

    remove: (state, action: PayloadAction<number>) => {
      const List = state.books.filter((el) => el.id !== action.payload);
      state.books = List;
     
    },

    markAsAdded: (state, action: PayloadAction<number>) => {
      const updatedBooks = state.books.map((book) =>
        book.id === action.payload ? { ...book, addedToCart: true } : book
      );
      state.books = updatedBooks;
    },
  },
});

export default BookSlice.reducer;
export const { remove, addBook, markAsAdded } = BookSlice.actions;