export type User = {
  firstname: string;
  lastname: string;
  email: string;
};
export type book ={
  id:number
  title :string,
  author:string,
  rating:number,
  description:string,
  image:string,
  value:string,
}
export const dataBooks = [
  {
    id:1,
    title: "The Alchemist",
    author: "By Paulo Coelho",
    rating: 3.7,
    description:
      "lorem ipum dolor sit amet , conset tur adipiscing elit sed do eiusmo tempor inclididunt ut lebore et.",
    image: "/src/assets/ee.jpg",
    value: "Business",
  },
  {
    id:2,
    title: "The zero",
    author: "By Paulo Coelho",
    rating: 4.7,
    description:
      "lorem ipum dolor sit amet , conset tur adipiscing elit sed do eiusmo tempor inclididunt ut lebore et.",
    image: "/src/assets/ee.jpg",
    value: "Philosophy",
  },
  {
    id:3,
    title: "Dark Murder",
    author: "by Helen H",
    rating: 2.5,
    description:
      "lorem ipum dolor sit amet , conset tur adipiscing elit sed do eiusmo tempor inclididunt ut lebore et.",
      image: "/src/assets/ee.jpg",
    value: "Fiction",
  },
  {
    id:4,
    title: "The gin",
    author: "By Paulo Coelho",
    rating: 1.7,
    description:
      "lorem ipum dolor sit amet , conset tur adipiscing elit sed do eiusmo tempor inclididunt ut lebore et.",
      image: "/src/assets/ee.jpg",
    value: "Science",
  },
  {

    id:5,
    title: "Math",
    author: "By Paulo Coelho",
    rating: 3.7,
    description:
      "lorem ipum dolor sit amet , conset tur adipiscing elit sed do eiusmo tempor inclididunt ut lebore et.",
      image: "/src/assets/ee.jpg",
    value: "Biography",},

    {

      id:6,
      title: "The elo",
      author: "By Paulo Coelho",
      rating: 4.7,
      description:
        "lorem ipum dolor sit amet , conset tur adipiscing elit sed do eiusmo tempor inclididunt ut lebore et.",
        image: "/src/assets/ee.jpg",
      value: "Science",},
];