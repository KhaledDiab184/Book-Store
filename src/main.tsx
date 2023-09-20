import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./router/Home.tsx";
import Login from "./router/Login.tsx";
import Register from "./router/Register.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { PersistGate } from "redux-persist/integration/react";
import Dashboard from "./router/Dashboard/Dashboard.tsx";
import Books from "./router/Books/Books.tsx";
import BookDetails from "./router/Books/BookDetails.tsx";
import AddBook from "./router/Dashboard/AddBook.tsx";
import AddCategory from "./router/Dashboard/AddCategory.tsx";
import AddAuthor from "./router/Dashboard/AddAuthor.tsx";
import EditBook from "./router/Dashboard/EditBook.tsx";
import { NotFound } from "./components/Content/NotFound.tsx";
import Cart from "./router/Cart.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route index path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Dashboard/*" element={<ProtectedRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="Book">
          <Route index path="Add" element={<AddBook />}></Route>
          <Route path=":bookId" element={<EditBook />}></Route>
        </Route>
        <Route path="Category">
          <Route path="Add" element={<AddCategory />}></Route>
        </Route>
        <Route path="Author">
          <Route path="Add" element={<AddAuthor />}></Route>
        </Route>
      </Route>
      <Route path="/Books">
        <Route index element={<Books />} />
        <Route path=":BookId" element={<BookDetails />} />
      </Route>
      <Route path="/*" element={<NotFound />}></Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}></PersistGate>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
