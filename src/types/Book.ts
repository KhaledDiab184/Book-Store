export type bookDetails= {
    id: number
    name: string
    price: number
    image: string
    about: string
    publishYear: number
    pageCount: number
    discount: number
    category: Category
    author: Author
    translator: string|null
    publisher: Publisher
    bookReviews: string|null
  }
  
  export interface Category {
    id: number
    name: string
  }
  
  export interface Author {
    id: number
    name: string
  }
  
  export interface Publisher {
    id: number
    name: string
    logo: string
  }
  