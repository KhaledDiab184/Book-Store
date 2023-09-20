import { Link } from "react-router-dom";
import { Button, Group, Rating, Text } from "@mantine/core";
import { Book } from "../../types/Books";
import { baseUrl } from "../../services/ApiClient";

type CardBookProp = {
  book: Book;
};

const CardBook = ({ book }: CardBookProp) => {
  return (
    <div className="col-12 col-md-6">
      <div className="p-1">
        <div className="card-book mt-4" style={{marginBottom:"200px"}}>
          <div
            className="card my-3 col-md-6"
            style={{ width: "100%" }}
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
                      by {book.author.name}
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
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>

              <hr />
              <div className="row g-0" style={{ margin: "5px 10px 10px 0px " }}>
                <Group
                  spacing="sm"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text fz="sm" fw={500}>
                    Price:{" "}
                    <small className="text-body-secondary">{book.price}$</small>
                  </Text>
                  <Link to={`Books/${book.id}`}>
                    <Button>More Details</Button>
                  </Link>
                </Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <Container
    //   mt={30}
    //   maw={"100%"}
    //   display={"flex"}
    //   style={{
    //     justifyContent: "space-between",
    //     flexWrap: "wrap",
    //     marginTop: "50px",
    //   }}
    //   className="col-md-12"
    // >

    // </Container>
  );
};

export default CardBook;
