import BooksTab from "../components/Content/BooksTab";
import { ShowHeader } from "../redux/HideSlice";
import { useAppDispatch } from "../redux/store";

const Home = () => {
  const dispatch = useAppDispatch();

  dispatch(ShowHeader());

  return (
    <div>
  
      <br />

      <div className="row">
        {/* <div className="col-1 col-md-2">
          <Side />
        </div> */}
        <div className="col-md-12 ">
          <BooksTab />
        </div>
      </div>
    </div>
  );
};

export default Home;
