import { Button } from "@mantine/core";
import { remove } from "../redux/BookSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { books } = useAppSelector((state) => state.books);

  const calculatedTotal = books.reduce((acc, book) => {
    return acc + book.price;
  }, 0);

  return (
    <>
      <h1
        className="fw-bold mb-0 text-black"
        style={{ textAlign: "center", marginTop: "30px" }}
      >
        Shipping Cart
      </h1>
      <section className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-8">
              <div
                className="card card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-12">
                      <div className="p-5">
                        {books.map((book) => (
                          <div key={book.id}>
                            <div className="row mb-4 d-flex justify-content-between align-items-center">
                              <div className="col-md-2 col-lg-2 col-xl-2">
                                <h6 className="text-black mb-0">{book.id}</h6>
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-3">
                                <h6 className="text-black mb-0">{book.name}</h6>
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <h6 className="mb-0">$ {book.price}</h6>
                              </div>
                              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <button
                                  onClick={() => {
                                    dispatch(remove(book.id));
                                  }}
                                  className="btn btn-danger px-2"
                                >
                                  remove
                                </button>
                              </div>
                              <hr className="my-4" />
                              <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                <a href="#!" className="text-muted">
                                  <i className="fas fa-times"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div
                          className="pt-5"
                          style={{
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                        >
                          <div>
                            <h6 className="mb-0">
                              <Link to={"/"} className="text-body">
                                <Button>Back to Home Page</Button>
                              </Link>
                            </h6>
                          </div>
                          <div className="d-flex mb-5">
                            <h6
                              className="text-uppercase"
                              style={{ marginRight: "10px" }}
                            >
                              Total price
                            </h6>
                            <h6>({calculatedTotal} $)</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
