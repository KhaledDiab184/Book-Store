import { Button, Group, Rating, Text } from "@mantine/core";
import { Book } from "../../types/Books";
import { baseUrl } from "../../services/ApiClient";
import { Link } from "react-router-dom";

type CardBookProp = {
  book: Book;
};

const CardBook = ({ book }: CardBookProp) => {
  return (
    <div className="col-12 col-md-6" style={{ marginTop: "30px" }}>
      <div className="p-1">
        <div className="card-book card mt-4">
          <div className="mb-3">
            <div className="row g-0" style={{width:"98%", margin:"5px"}}>
              <div className="col-4 col-md-4">
                <div style={{ height: "350px" }}>
                  {" "}
                  <img
                    src={`${baseUrl}/images/thumbs/med/${book.image}`}
                    alt=""
                    className=""
                    style={{ width: "100%", height: "98%" }}
                  />
                </div>
              </div>
              <div className="col-8 col-md-8">
                <div className="card-body ">
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
                </div>
              </div>
              <hr />
              <div className="row g-0" style={{ margin: "5px 10px 10px 0px " }}>
                <Group
                  spacing="sm"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text fz="sm" fw={500} style={{ marginLeft: "15px" }}>
                    Price:{" "}
                    <small className="text-body-secondary">{book.price}$</small>
                  </Text>
                  <Link to={`/Books/${book.id}`} style={{ marginRight: "15px" }}>
                    <Button>More Details</Button>
                  </Link>
                </Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBook;
