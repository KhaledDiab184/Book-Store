export type Book = {
    id: number;
    name: string;
    price: number;
    discount: number;
    publishYear: number;
    image: string;
    category: Category;
    author: Author;
    translator: string|null;
    publisher: Publisher;
  }
  
  export type Category = {
    id: number;
    name: string;
  }
  
  export type Author = {
    id: number;
    name: string;
  }
  
  export type Publisher = {
    id: number;
    name: string;
    logo: string;
  }