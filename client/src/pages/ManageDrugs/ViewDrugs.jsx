import { useEffect } from "react";
import { getAllCategories, getAllDrugs } from "../../services/drug.services";
import { useDispatch } from "react-redux";
import {
  fetchAllCategories,
  fetchAllDrugs,
} from "../../actions/drugActions/drugActions";

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
  }, []);

  return <div>ViewDrugs</div>;
};

export default ViewDrugs;
