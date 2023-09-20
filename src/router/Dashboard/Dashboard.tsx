import ApiClient, { baseUrl } from "../../services/ApiClient";
import { useEffect, useState } from "react";
import { Book } from "../../types/Books";
import Modal from "../../components/Models/Modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Container, Group, Rating, Text } from "@mantine/core";

const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const fetchBooks = () => {
    ApiClient.get<Book[]>("/Book")
      .then((response) => {
        console.log(response.data);
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error :", error);
      });
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => {
    setShowModal(false);
  };
  const [BookId, setBookId] = useState(-1);
  const handleModalSubmit = () => {
    setIsLoadingDelete(true);
    ApiClient.delete(`/Book/${BookId}`)
      .then(() => {
        fetchBooks();
        setIsLoadingDelete(false);
        setShowModal(false);

        toast.success("Book deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting Book:", error);
        toast.error("Error deleting Book. Please try again later.");
      });
  };
  return (
    <>
      <Container
        mt={30}
        maw={"100%"}
        display={"flex"}
        style={{
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginTop: "50px",
        }}
      >
        {books.map((book) => {
          return (
            <div
              className="card my-3 col-md-4"
              style={{ width: "48%" }}
              key={book.id}
            >
              <div
                className="row g-0 col-md-6"
                style={{ width: "98%", margin: "5px" }}
              >
                <div className="col-md-4" style={{ height: "350px" }}>
                  <img
                    src={`${baseUrl}/images/thumbs/med/${book.image}`}
                    style={{
                      height: "98%",
                      width: "100%",
                    }}
                  />
                </div>
                <div className="col-md-8" style={{ display: "flex" }}>
                  <div className="card-body col-md-7">
                    <h5 className="card-title">{book.name}</h5>

                    <p className="card-subtitle">
                      <small className="text-body-secondary">
                        by {book.publisher.name}
                      </small>
                    </p>
                    <br />
                    <Group>
                      <Rating value={3.5} fractions={2} readOnly />

                      <small className="text-body-secondary">
                        1,554,230 votes
                      </small>
                    </Group>
                    <br />
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        Last updated 3 mins ago
                      </small>
                    </p>
                  </div>
                </div>

                <hr />
                <div
                  className="row g-0"
                  style={{ margin: "5px 10px 10px 0px " }}
                >
                  <Group
                    spacing="sm"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <Text fz="sm" fw={500}>
                        Price:{" "}
                        <small className="text-body-secondary">
                          {book.price}$
                        </small>
                      </Text>
                    </div>
                    <div>
                      <Button
                        className="btn btn-success"
                        style={{ marginRight: "5px" }}
                        onClick={() => {
                          navigate(`/Dashboard/Book/${book.id}`, {
                            replace: true,
                          });
                        }}
                      >
                        Edit Book
                      </Button>
                      <Button
                        className="btn btn-danger"
                        onClick={() => {
                          setBookId(book.id);
                          setShowModal(!showModal);
                        }}
                      >
                        Delete Book
                      </Button>
                    </div>
                  </Group>
                </div>
              </div>
            </div>
          );
        })}

        <Modal show={showModal} onClose={handleModalClose}>
          <div className="modal-header">
            <h5 className="modal-title">Deleting Book</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleModalClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to Delete?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleModalClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleModalSubmit}
              disabled={isLoadingDelete}
            >
              {isLoadingDelete ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  <span role="status">Loading...</span>
                </>
              ) : (
                "Yes, Delete"
              )}
            </button>
          </div>
        </Modal>
      </Container>
    </>
  );
};

export default Dashboard;
