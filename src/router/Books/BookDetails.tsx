import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { bookDetails } from "../../types/Book";
import ApiClient, { baseUrl } from "../../services/ApiClient";
import { Button } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addBook, markAsAdded } from "../../redux/BookSlice";

const BookDetails = () => {
  const { BookId } = useParams();
  const [book, setBook] = useState<bookDetails>({} as bookDetails);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { books } = useAppSelector((state) => state.books);

  const isBookInCart = books.some((cartBook) => cartBook.id === book.id);

  useEffect(() => {
    setIsLoading(true);
    ApiClient.get(`/Book/${BookId}`)
      .then(({ data }) => {
        setBook(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setIsLoading(false);
      });
  }, [BookId]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-lg-12 p-5">
              <div
                className="card mb-3"
                style={{ maxWidth: "1000px", height: "auto" }}
              >
                <div className="row g-0">
                  <div className="col-4 col-md-4">
                    <img
                      src={`${baseUrl}/images/thumbs/med/${book.image}`}
                      className="img-fluid rounded-start"
                    />
                  </div>
                  <div className="col-8 col-md-8">
                    <div className="card-body">
                      <h5>{book.name}</h5>
                      {book.author && <h5>{book.author.name}</h5>}
                      {book.category && (
                        <h5 className="card-title">{book.category.name}</h5>
                      )}
                      <p className="card-text"> {book.publishYear}</p>

                      <h5>{book.price}$</h5>
                      <small>{book.about}</small>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        
                      }}
                    >
                      <h6 className="mt-4">
                        <Button
                          onClick={() => {
                            if (!isBookInCart) {
                              dispatch(addBook(book));

                              dispatch(markAsAdded(book.id));
                            }
                          }}
                          disabled={isBookInCart}
                        >
                          {isBookInCart ? "Already in Cart" : "+ Add to Cart"}
                        </Button>
                      </h6>

                      <h6 className="mt-4" style={{marginLeft:"10px"}}>
                        <Link to={"/"} className="text-body">
                          <Button>Back to Home Page</Button>
                        </Link>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetails;
