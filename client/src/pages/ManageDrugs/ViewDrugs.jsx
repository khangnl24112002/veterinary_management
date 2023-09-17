import { useEffect } from "react";
import { getAllCategories, getAllDrugs } from "../../services/drug.services";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategories,
  fetchAllDrugs,
} from "../../actions/drugActions/drugActions";
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";
const ViewDrugs = () => {
  // dung dispatch de dua du lieu len reducer
  const dispatch = useDispatch();
  // goi API de lay danh sach drug
  useEffect(() => {
    const fetchData = async () => {
      try {
        const drug = await getAllDrugs();

        const categories = await getAllCategories();
        // fetch thanh cong: dispatch du lieu len reducer
        // xu ly du lieu categories
        let newCategories = [];
        for (let i = 0; i < categories.data.length; i++) {
          newCategories.push(categories.data[i].categories);
        }
        dispatch(fetchAllCategories(newCategories));
        dispatch(fetchAllDrugs(drug.data));
      } catch (error) {
        return (
          <>
            <p>Cannot fetch data!</p>
          </>
        );
      }
    };
    fetchData();
  }, [dispatch]);

  const drugList = useSelector((state) => state.drug.drug);
  return (
    <div>
      <Link
        to="addNewDrugs"
        className="my-4 px-4 py-2 text-white hover:bg-blue-700 bg-blue-500 rounded-lg"
      >
        Add new drugs
      </Link>

      <div className="grid grid-cols-4 gap-4 mt-10">
        {drugList.map((item, index) => {
          return <Card key={index} drug={item} />;
        })}
      </div>
    </div>
  );
};

export default ViewDrugs;
