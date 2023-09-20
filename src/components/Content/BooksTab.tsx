import { Container, Tabs } from "@mantine/core";
import CardBook from "./CardBook";

import { useEffect, useState } from "react";
import ApiClient from "../../services/ApiClient";
import {  Book, Category } from "../../types/Books";

const BooksTab = () => {
  // const [authors, setAuthors] = useState<Author[]>();
  const [books, setBooks] = useState<Book[]>([]);
  const itemElements = [];
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    ApiClient.get("/Book").then((response) => {
      setBooks(response.data);
    });
    // ApiClient.get("/Author").then((response) => {
    //   setAuthors(response.data);
    // });
    ApiClient.get("/Category").then((response) => {
      setCategories(response.data);
    });
  }, []);

  for (let i = 0; i < books.length; i++) {
    itemElements.push(<CardBook key={i} book={books[i]} />);
  }

  return (
    <Container mt={30} ml={20} mr={20} maw={"100%"}>
      <div className="row g-0" style={{ display: "flex" }}>
        <div className="col-md-3">
          {/* <h4>Author of the week</h4>
          <br />
          <ul>
            <Group spacing="sm" style={{ marginLeft: 0 }}>
              <ol className="list">
                {authors?.map((author) => (
                  <li key={author.id} style={{ marginBottom: "5px" }}>
                    {author.name}
                  </li>
                ))}
              </ol>
            </Group>
          </ul>
          <br />
          <br />
          <h4>Books of the year</h4>
          <ul>
            <Group spacing="sm">
              <ol className="list">
                {books?.map((book) => (
                  <li key={book.id} style={{ marginBottom: "5px" }}>
                    {book.name}
                  </li>
                ))}
              </ol>
            </Group>
          </ul> */}
        </div>
      
      <div className="col-md-9">
        <Tabs defaultValue="ALL Genres">
          <h4 className="mt-">Popular by Genre</h4>
          <Tabs.List position="right">
            <Tabs.Tab value="ALL Genres">ALL Genres</Tabs.Tab>
            {categories?.map((category, index) => (
              <Tabs.Tab key={index} value={category.name}>
                {category.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          <Tabs.Panel value="ALL Genres" pb="xs">
            <div className="container ">
              <div className="row g-2">{itemElements}</div>
            </div>
          </Tabs.Panel>
          {categories?.map((category, index) => (
            <Tabs.Panel key={index} value={category.name}>
              <div className="container ">
                <div className="row g-2">
                  {books.map(
                    (book) =>
                      book.category.name === category.name && (
                        <CardBook key={book.id} book={book} />
                      )
                  )}
                </div>
              </div>
            </Tabs.Panel>
          ))}
        </Tabs>
        </div>
        </div>
    </Container>
  );
};

export default BooksTab;
