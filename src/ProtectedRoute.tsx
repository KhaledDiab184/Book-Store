import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { HideHeader } from "./redux/HideSlice";
import { useState } from "react";

const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [toggleNavBar, setToggleNavBar] = useState(false);
  const handleToggle = () => {
    setToggleNavBar((prevState) => !prevState);
  };
  if (isAuth) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <nav className="mt-2 navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid">
                <Link className="navbar-brand" to={"/Dashboard"}>
                  Dashboard
                </Link>
                <button
                 onClick={handleToggle}
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
             
                  <span className="navbar-toggler-icon"></span>
                </button>
         
                <div className={
              toggleNavBar
                ? "collapse navbar-collapse justify-content-between show"
                : "collapse navbar-collapse justify-content-between"
            } id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink end to={"/Dashboard"} className="nav-link ">
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        end
                        to={"/Dashboard/Book/Add"}
                        className="nav-link "
                      >
                        Add Book
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        end
                        to={"/Dashboard/Category/Add"}
                        className="nav-link "
                      >
                        Add Category
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        end
                        to={"/Dashboard/Author/Add"}
                        className="nav-link "
                      >
                        Add Author
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <Outlet />
          </div>
        </div>
      </div>
    );
  } else {
    dispatch(HideHeader());
    return <Navigate to={"/Login"} />;
  }
};

export default ProtectedRoute;
